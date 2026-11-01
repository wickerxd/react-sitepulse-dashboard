import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import NotificationDisplay from "./NotificationDisplay";
import Panel from "./Panel";
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
    <Panel
      title="Ειδοποιήσεις"
      action={<Chip label={alertChipText(alerts)} color="error" size="small" />}
    >
      <Stack spacing={1}>
        {alerts.map((alert) => (
          <NotificationDisplay key={alert.id} alert={alert} />
        ))}
      </Stack>
    </Panel>
  );
}
