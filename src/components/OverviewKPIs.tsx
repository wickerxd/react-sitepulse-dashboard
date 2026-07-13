import InfoCard from "../components/InfoCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type KPIType = "text" | "percentage" | "critical";

export interface KPI {
  type: KPIType;
  title: string;
  content: string | number;
}

interface OverviewKPIsProps {
  KPIs: KPI[];
}
interface ContentType {
  type: KPIType;
  content: string | number;
}

function ContentType({ type, content }: ContentType) {
  if (type === "text")
    return (
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{content}</Typography>
    );
  if (type === "percentage" && typeof content === "number") {
    return (
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {content * 100}%
        </Typography>

        <Box sx={{ width: "100%", alignContent: "center" }}>
          <LinearProgress
            variant="determinate"
            value={content * 100}
            color="success"
            aria-label="Export data"
            sx={{ marginTop: "auto" }}
          />
        </Box>
      </Stack>
    );
  }
  if (type === "critical") {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {content}
        </Typography>
        <FiberManualRecordIcon color="secondary" />
      </Box>
    );
  }
}

export default function OverviewKPIs({ KPIs }: OverviewKPIsProps) {
  return (
    <Grid container spacing={2}>
      {KPIs.map((kpi) => (
        <Grid key={kpi.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCard title={kpi.title}>
            {ContentType({ type: kpi.type, content: kpi.content })}
          </InfoCard>
        </Grid>
      ))}
    </Grid>
  );
}
