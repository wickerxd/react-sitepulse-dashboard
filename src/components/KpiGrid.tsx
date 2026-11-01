import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoCard from "./InfoCard";

type KpiVariant = "text" | "percentage" | "critical";

export interface Kpi {
  type: KpiVariant;
  title: string;
  content: string | number;
}

interface KpiContentProps {
  kpi: Kpi;
}

function KpiContent({ kpi }: KpiContentProps) {
  if (kpi.type === "percentage" && typeof kpi.content === "number") {
    const percentage = Math.round(kpi.content * 100);
    const color =
      percentage >= 80 ? "success" : percentage >= 50 ? "warning" : "error";

    return (
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {percentage}%
        </Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            color={color}
            aria-label={`${kpi.title}: ${percentage}%`}
          />
        </Box>
      </Stack>
    );
  }

  if (kpi.type === "critical") {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {kpi.content}
        </Typography>
        <FiberManualRecordIcon color="error" aria-hidden="true" />
      </Box>
    );
  }

  return (
    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
      {kpi.content}
    </Typography>
  );
}

interface KpiGridProps {
  kpis: Kpi[];
}

export default function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <Grid container spacing={2}>
      {kpis.map((kpi) => (
        <Grid key={kpi.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCard title={kpi.title}>
            <KpiContent kpi={kpi} />
          </InfoCard>
        </Grid>
      ))}
    </Grid>
  );
}
