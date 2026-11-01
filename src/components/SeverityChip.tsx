import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import type { Severity } from "../types";

const severityColor: Record<Severity, ChipProps["color"]> = {
  critical: "error",
  high: "warning",
  medium: "info",
  low: "default",
};

const severityLabel: Record<Severity, string> = {
  critical: "Κρίσιμο",
  high: "Υψηλό",
  medium: "Μέτριο",
  low: "Χαμηλό",
};

interface SeverityChipProps {
  severity: Severity;
  label?: string;
  size?: ChipProps["size"];
}

export default function SeverityChip({
  severity,
  label,
  size = "small",
}: SeverityChipProps) {
  return (
    <Chip
      label={label ?? severityLabel[severity]}
      color={severityColor[severity]}
      size={size}
    />
  );
}
