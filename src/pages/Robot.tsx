import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import PanToolIcon from "@mui/icons-material/PanTool";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { BarChart } from "@mui/x-charts/BarChart";
import KpiGrid from "../components/KpiGrid";
import type { Kpi } from "../components/KpiGrid";
import Panel from "../components/Panel";
import SeverityChip from "../components/SeverityChip";
import { robot, robotDetectionsByHour } from "../data";
import type {
  DetectionType,
  GasLevel,
  Severity,
} from "../types";

const detectionLabels: Record<DetectionType, string> = {
  no_helmet: "Χωρίς κράνος",
  no_gloves: "Χωρίς γάντια",
  obstacle: "Εμπόδιο",
  gas_leak: "Διαρροή αερίου",
  proximity: "Εγγύτητα",
};

const detectionSeverity: Record<DetectionType, Severity> = {
  no_helmet: "critical",
  no_gloves: "high",
  obstacle: "medium",
  gas_leak: "critical",
  proximity: "high",
};

const gasLabels: Record<GasLevel, string> = {
  normal: "Φυσιολογικά",
  warning: "Προσοχή",
  critical: "Κίνδυνος",
};

const coverageColor: Record<
  Severity,
  "success" | "info" | "warning" | "error"
> = {
  low: "success",
  medium: "info",
  high: "warning",
  critical: "error",
};

function DetectionIcon({ type }: { type: DetectionType }) {
  switch (type) {
    case "no_helmet":
      return <WarningAmberIcon color="error" />;
    case "no_gloves":
      return <PanToolIcon color="warning" />;
    case "obstacle":
      return <ReportProblemIcon color="info" />;
    case "gas_leak":
      return <GasMeterIcon color="error" />;
    case "proximity":
      return <DirectionsRunIcon color="warning" />;
  }
}

export default function Robot() {
  const kpis: Kpi[] = [
    {
      type: "percentage",
      title: "Μπαταρία",
      content: robot.battery / 100,
    },
    { type: "text", title: "Θερμοκρασία", content: `${robot.tempC}°C` },
    { type: "text", title: "Αέρας", content: gasLabels[robot.gas] },
    { type: "text", title: "Λειτουργία", content: robot.mode },
  ];

  return (
    <>
      <Panel
        title="Κατάσταση ρομπότ"
        subtitle={robot.model}
        action={
          <Chip
            label={robot.connected ? "Συνδεδεμένο" : "Εκτός σύνδεσης"}
            color={robot.connected ? "success" : "error"}
            icon={<FiberManualRecordIcon />}
          />
        }
      >
        <KpiGrid kpis={kpis} />
      </Panel>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 2 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel
            title="Ζωντανές ανιχνεύσεις"
            action={<Chip label="Live" color="success" size="small" />}
          >
            <Stack spacing={1}>
              {robot.detections.map((detection) => (
                <Box
                  key={detection.id}
                  component="article"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <DetectionIcon type={detection.type} />
                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", flexWrap: "wrap" }}
                      >
                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                          {detectionLabels[detection.type]}
                        </Typography>
                        <SeverityChip
                          severity={detectionSeverity[detection.type]}
                        />
                      </Stack>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 12 }}
                      >
                        {detection.zone} • {detection.time}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ minWidth: 90 }}>
                    <Typography
                      sx={{ color: "text.secondary", fontSize: 12 }}
                      align="right"
                    >
                      {Math.round(detection.confidence * 100)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={detection.confidence * 100}
                      color="success"
                      aria-label={`Βεβαιότητα ανίχνευσης: ${Math.round(
                        detection.confidence * 100,
                      )}%`}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel title="Κάλυψη ζωνών">
            <Stack spacing={2}>
              {robot.coverage.map((zone) => (
                <Box key={zone.zone}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                      {zone.zone}
                    </Typography>
                    <SeverityChip severity={zone.risk} />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={zone.coverage}
                    color={coverageColor[zone.risk]}
                    aria-label={`Κάλυψη ${zone.zone}: ${zone.coverage}%`}
                  />
                  <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                    {zone.coverage}% κάλυψη
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider />

            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
              Διαδρομή περιπολίας
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}
            >
              {robot.coverage.map((zone, index) => (
                <Stack
                  key={zone.zone}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <Chip label={zone.zone} size="small" />
                  {index < robot.coverage.length - 1 && (
                    <Typography sx={{ color: "text.secondary" }}>→</Typography>
                  )}
                </Stack>
              ))}
              <Typography sx={{ color: "text.secondary" }}>→</Typography>
              <Chip label="Επιστροφή βάσης" size="small" variant="outlined" />
            </Stack>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Ανιχνεύσεις ανά ώρα">
            <BarChart
              height={300}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: robotDetectionsByHour.map((entry) => entry.time),
                },
              ]}
              yAxis={[{ label: "Ανιχνεύσεις" }]}
              series={[
                {
                  label: "Ανιχνεύσεις",
                  data: robotDetectionsByHour.map((entry) => entry.detections),
                  color: "#0288d1",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Μητρώο ανιχνεύσεων">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="Μητρώο ανιχνεύσεων">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ΩΡΑ</TableCell>
                    <TableCell align="left">ΤΥΠΟΣ</TableCell>
                    <TableCell align="left">ΖΩΝΗ</TableCell>
                    <TableCell align="left">ΣΟΒΑΡΟΤΗΤΑ</TableCell>
                    <TableCell align="left">ΒΕΒΑΙΟΤΗΤΑ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {robot.detections.map((detection) => (
                    <TableRow
                      key={detection.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{detection.time}</TableCell>
                      <TableCell align="left">
                        {detectionLabels[detection.type]}
                      </TableCell>
                      <TableCell align="left">{detection.zone}</TableCell>
                      <TableCell align="left">
                        <SeverityChip
                          severity={detectionSeverity[detection.type]}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {Math.round(detection.confidence * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
