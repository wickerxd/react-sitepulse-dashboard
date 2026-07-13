import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import NotificationDisplay, { type Alert } from "./NotificationDisplay";

interface NotificationCenterProps {
  alerts: Alert[];
}

function alertChipText(alerts: Alert[]): string {
  return `${alerts.filter((alert) => alert.severity === "critical").length} Critical • ${alerts.filter((alert) => alert.severity === "high").length} High`;
}
export default function NotificationCenter({
  alerts,
}: NotificationCenterProps) {
  return (
    <Box
      sx={{
        p: 2,
        background: grey[300],
        border: "2px solid grey",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
        >
          Ειδοποίησεις
        </Typography>
        <Chip label={alertChipText(alerts)} color="error" />
      </Box>
      {alerts.map((alert) => (
        <NotificationDisplay key={alert.id} alert={alert}></NotificationDisplay>
      ))}
    </Box>
  );
}
