import { Box, Typography, Button } from "@mui/material";
import { workers } from "../data";
export type Severity = "critical" | "high" | "medium" | "low";
type AlertType = "proximity" | "ppe_violation" | "alien_attack";

const alertText: Record<AlertType, string> = {
  proximity: "Proximity",
  ppe_violation: "PPE Violation",
  alien_attack: "Alien Attack",
};

const alertColor: Record<Severity, string> = {
  critical: "red",
  high: "orange",
  medium: "yellow",
  low: "grey",
};
export interface Alert {
  id: string;
  workerId: string;
  type: AlertType;
  severity: Severity;
  message: string;
  time: string;
}
interface NotificationDisplayProps {
  alert: Alert;
}

function findWorkerName(workerId: string): string {
  const worker = workers.find((w) => w.id === workerId);
  return worker ? worker.name : "Unknown";
}

function alertTitle(alertType: AlertType, severity: Severity) {
  if (severity === "critical") {
    return (
      <Typography
        sx={{ fontSize: 16, color: alertColor[severity], fontWeight: 700 }}
      >
        {severity.toUpperCase()} • {alertText[alertType]}
      </Typography>
    );
  }
  if (severity === "high") {
    return (
      <Typography
        sx={{ fontSize: 16, color: alertColor[severity], fontWeight: 700 }}
      >
        {severity.toUpperCase()} • {alertText[alertType]}
      </Typography>
    );
  }
  if (severity === "low") {
    return (
      <Typography
        sx={{ fontSize: 16, color: alertColor[severity], fontWeight: 700 }}
      >
        {severity.toUpperCase()} • {alertText[alertType]}
      </Typography>
    );
  }
}

export default function NotificationDisplay({
  alert,
}: NotificationDisplayProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        borderTop: `2px solid ${alertColor[alert.severity]}`,
        borderRight: `2px solid ${alertColor[alert.severity]}`,
        borderBottom: `2px solid ${alertColor[alert.severity]}`,
        borderLeft: `8px solid ${alertColor[alert.severity]}`,
        bgcolor: "white",
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {alertTitle(alert.type, alert.severity)}
      <Typography sx={{ color: "text.primary", fontSize: 16 }}>
        {alert.message}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
        {findWorkerName(alert.workerId)} • {alert.time}
      </Typography>
      {alert.severity !== "low" && (
        <Button sx={{ marginLeft: "auto" }} variant="contained">
          Ack
        </Button>
      )}
    </Box>
  );
}
