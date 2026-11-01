import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SeverityChip from "./SeverityChip";
import { workers } from "../data";
import type { Alert, AlertType, Severity } from "../types";

const alertText: Record<AlertType, string> = {
  proximity: "Εγγύτητα",
  ppe_violation: "Παράβαση ΜΑΠ",
  obstacle: "Εμπόδιο",
  gas_leak: "Διαρροή αερίου",
};

const alertBorderColor: Record<Severity, string> = {
  critical: "red",
  high: "orange",
  medium: "goldenrod",
  low: "grey",
};

function findWorkerName(workerId: string): string {
  return workers.find((worker) => worker.id === workerId)?.name ?? "Άγνωστος";
}

interface NotificationDisplayProps {
  alert: Alert;
}

export default function NotificationDisplay({
  alert,
}: NotificationDisplayProps) {
  return (
    <Box
      component="article"
      sx={{
        p: 2,
        borderRadius: 2,
        borderTop: `2px solid ${alertBorderColor[alert.severity]}`,
        borderRight: `2px solid ${alertBorderColor[alert.severity]}`,
        borderBottom: `2px solid ${alertBorderColor[alert.severity]}`,
        borderLeft: `8px solid ${alertBorderColor[alert.severity]}`,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SeverityChip severity={alert.severity} />
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          {alertText[alert.type]}
        </Typography>
      </Box>
      <Typography sx={{ color: "text.primary", fontSize: 16 }}>
        {alert.message}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
        {findWorkerName(alert.workerId)} • {alert.time}
      </Typography>
      {alert.severity !== "low" && (
        <Button
          sx={{ marginLeft: "auto" }}
          variant="contained"
          size="small"
          aria-label={`Επιβεβαίωση ειδοποίησης: ${alert.message}`}
        >
          Ack
        </Button>
      )}
    </Box>
  );
}
