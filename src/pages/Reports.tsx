import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import KpiGrid from "../components/KpiGrid";
import type { Kpi } from "../components/KpiGrid";
import Panel from "../components/Panel";
import { reportVolume, safetyReports, scheduledReports } from "../data";
import type {
  ReportFormat,
  ReportStatus,
  ReportType,
} from "../types";

const statusLabels: Record<ReportStatus, string> = {
  ready: "Έτοιμη",
  processing: "Σε εξέλιξη",
  scheduled: "Προγραμματισμένη",
  failed: "Αποτυχία",
};

const statusColors: Record<ReportStatus, ChipProps["color"]> = {
  ready: "success",
  processing: "info",
  scheduled: "default",
  failed: "error",
};

const reportTypes: ReportType[] = [
  "Συμμόρφωση ΜΑΠ",
  "Ατυχήματα",
  "Επιθεώρηση εργοταξίου",
  "Υγεία εξοπλισμού",
];

const reportTypeData = reportTypes.map((type, index) => ({
  id: index,
  label: type,
  value: safetyReports.filter((report) => report.type === type).length,
}));

const currentVolume = reportVolume[reportVolume.length - 1];
const readyReports = safetyReports.filter(
  (report) => report.status === "ready",
).length;
const openReports = safetyReports.filter(
  (report) => report.status === "processing" || report.status === "failed",
).length;
const activeSchedules = scheduledReports.filter((report) => report.active).length;

export default function Reports() {
  const [exportRange, setExportRange] = useState("30");
  const [lastExport, setLastExport] = useState<ReportFormat | null>(null);

  const kpis: Kpi[] = [
    {
      type: "text",
      title: "Αναφορές Ιουνίου",
      content: currentVolume.generated,
    },
    {
      type: "text",
      title: "Ενεργοί προγραμματισμοί",
      content: activeSchedules,
    },
    {
      type: "percentage",
      title: "Έτοιμες προς λήψη",
      content: readyReports / safetyReports.length,
    },
    {
      type: "critical",
      title: "Εκκρεμότητες",
      content: openReports,
    },
  ];

  const queueExport = (format: ReportFormat) => {
    setLastExport(format);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <KpiGrid kpis={kpis} />
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel
            title="Όγκος αναφορών"
            subtitle="Αυτόματες και προγραμματισμένες εξαγωγές ανά μήνα"
          >
            <BarChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: reportVolume.map((entry) => entry.month),
                },
              ]}
              yAxis={[{ label: "Αναφορές" }]}
              series={[
                {
                  label: "Αυτόματες",
                  data: reportVolume.map((entry) => entry.generated),
                  stack: "reports",
                  color: "#2563eb",
                },
                {
                  label: "Προγραμματισμένες",
                  data: reportVolume.map((entry) => entry.scheduled),
                  stack: "reports",
                  color: "#0f766e",
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel
            title="Κατανομή ανά τύπο"
            subtitle="Πρόσφατες αναφορές του μητρώου"
          >
            <PieChart
              height={320}
              series={[
                {
                  innerRadius: "42%",
                  paddingAngle: 2,
                  data: reportTypeData,
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Panel
            title="Πρόσφατες αναφορές"
            action={
              <Chip
                label={`${safetyReports.length} εγγραφές`}
                size="small"
                variant="outlined"
              />
            }
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 980 }} aria-label="Μητρώο αναφορών">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ΑΝΑΦΟΡΑ</TableCell>
                    <TableCell align="left">ΤΥΠΟΣ</TableCell>
                    <TableCell align="left">ΕΥΡΟΣ</TableCell>
                    <TableCell align="left">ΠΕΡΙΟΔΟΣ</TableCell>
                    <TableCell align="left">FORMAT</TableCell>
                    <TableCell align="left">ΚΑΤΑΣΤΑΣΗ</TableCell>
                    <TableCell align="left">ΗΜ/ΝΙΑ</TableCell>
                    <TableCell align="right">ΕΝΕΡΓΕΙΑ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {safetyReports.map((report) => (
                    <TableRow
                      key={report.id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Stack spacing={0.25}>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                            {report.title}
                          </Typography>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: 11 }}
                          >
                            {report.id} • {report.owner}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{report.type}</TableCell>
                      <TableCell align="left">{report.scope}</TableCell>
                      <TableCell align="left">{report.period}</TableCell>
                      <TableCell align="left">
                        <Chip
                          label={report.format}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          label={statusLabels[report.status]}
                          size="small"
                          color={statusColors[report.status]}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ fontSize: 12 }}>
                          {report.generatedAt}
                        </Typography>
                        {report.status === "ready" && (
                          <Typography
                            sx={{ color: "text.secondary", fontSize: 11 }}
                          >
                            {report.sizeMb} MB
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip
                          title={
                            report.status === "failed"
                              ? "Επανάληψη"
                              : report.status === "processing"
                                ? "Σε εξέλιξη"
                                : "Λήψη"
                          }
                        >
                          <span>
                            <IconButton
                              size="small"
                              disabled={
                                report.status === "processing" ||
                                report.status === "scheduled"
                              }
                              aria-label={
                                report.status === "failed"
                                  ? `Επανάληψη ${report.title}`
                                  : `Λήψη ${report.title}`
                              }
                            >
                              {report.status === "failed" ? (
                                <RefreshRoundedIcon fontSize="small" />
                              ) : (
                                <DownloadRoundedIcon fontSize="small" />
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            <Panel
              title="Προγραμματισμένες"
              action={
                <Chip
                  label={`${activeSchedules} ενεργές`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              }
            >
              <Stack spacing={1.25}>
                {scheduledReports.map((report) => (
                  <Box
                    key={report.id}
                    sx={{
                      p: 1.5,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "background.default",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1.5,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "action.selected",
                            color: "primary.main",
                            flexShrink: 0,
                          }}
                        >
                          <EventRepeatRoundedIcon fontSize="small" />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                            {report.title}
                          </Typography>
                          <Typography
                            sx={{ color: "text.secondary", fontSize: 11 }}
                          >
                            {report.cadence} • {report.format}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip
                        label={report.active ? "Ενεργή" : "Σε παύση"}
                        size="small"
                        color={report.active ? "success" : "default"}
                        variant={report.active ? "filled" : "outlined"}
                        sx={{ flexShrink: 0 }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mt: 1.25, flexWrap: "wrap", rowGap: 0.5 }}
                    >
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 11 }}
                      >
                        Επόμενη:{" "}
                        <Box
                          component="span"
                          sx={{ color: "text.primary", fontWeight: 700 }}
                        >
                          {report.nextRun}
                        </Box>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 11 }}
                      >
                        {report.recipients} παραλήπτες
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Panel>

            <Panel
              title="Γρήγορη εξαγωγή"
              subtitle="Δημιουργία αναφοράς από τα τρέχοντα δεδομένα"
            >
              <TextField
                select
                fullWidth
                size="small"
                label="Εύρος περιόδου"
                value={exportRange}
                onChange={(event) => setExportRange(event.target.value)}
              >
                <MenuItem value="7">Τελευταίες 7 ημέρες</MenuItem>
                <MenuItem value="30">Τελευταίες 30 ημέρες</MenuItem>
                <MenuItem value="90">Τελευταίο τρίμηνο</MenuItem>
                <MenuItem value="365">Τελευταίο έτος</MenuItem>
              </TextField>

              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<DescriptionRoundedIcon />}
                  onClick={() => queueExport("PDF")}
                >
                  PDF
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadRoundedIcon />}
                  onClick={() => queueExport("CSV")}
                >
                  CSV
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={() => queueExport("XLSX")}
                >
                  XLSX
                </Button>
              </Stack>

              {lastExport && (
                <Alert
                  severity="success"
                  onClose={() => setLastExport(null)}
                >
                  Η εξαγωγή {lastExport} μπήκε στην ουρά για επεξεργασία.
                </Alert>
              )}

              <Divider />
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Οι νέες αναφορές εμφανίζονται στο μητρώο μετά την ολοκλήρωση
                της επεξεργασίας.
              </Typography>
            </Panel>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
