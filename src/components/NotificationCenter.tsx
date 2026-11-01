import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import NotificationDisplay from "./NotificationDisplay";
import type { Alert } from "../types";

interface NotificationCenterProps {
  alerts: Alert[];
}

function alertChipText(alerts: Alert[]): string {
  const critical = alerts.filter((alert) => alert.severity === "critical").length;
  const high = alerts.filter((alert) => alert.severity === "high").length;

  return `${critical} Critical • ${high} High`;
}

export default function NotificationCenter({
  alerts,
}: NotificationCenterProps) {
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        background: grey[300],
        border: "2px solid grey",
        borderRadius: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography
          component="h2"
          sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
        >
          Ειδοποιήσεις
        </Typography>
        <Chip label={alertChipText(alerts)} color="error" />
      </Stack>
      <Stack spacing={1}>
        {alerts.map((alert) => (
          <NotificationDisplay key={alert.id} alert={alert} />
        ))}
      </Stack>
    </Box>
  );
}
