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

const alertTone: Record<Severity, "error" | "warning" | "info" | "success"> = {
  critical: "error",
  high: "warning",
  medium: "info",
  low: "success",
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
        p: 1.5,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        borderLeftWidth: 4,
        borderLeftColor: `${alertTone[alert.severity]}.main`,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SeverityChip severity={alert.severity} />
        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
          {alertText[alert.type]}
        </Typography>
      </Box>
      <Typography sx={{ color: "text.primary", fontSize: 14 }}>
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
          Επιβεβαίωση
        </Button>
      )}
    </Box>
  );
}
