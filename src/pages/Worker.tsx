import { Link as RouterLink, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Panel from "../components/Panel";
import SeverityChip from "../components/SeverityChip";
import { alerts, incidents, workers } from "../data";
import type { Fatigue } from "../types";

const fatigueText: Record<Fatigue, string> = {
  high: "υψηλή",
  medium: "μέτρια",
  low: "χαμηλή",
};

const complianceOffsets = [-12, -8, -5, -2, 1, 4, 2, 0, 3, 6, 4, 2, 5, 3];
const heartRateOffsets = [-8, -4, -2, 3, 7, 4, 1, 5, 8, 3, 0, -3, 2, 1];
const fatigueOffsets = [-6, -2, 1, 4, 8, 5, 2, 6, 9, 4, 1, -2, 3, 0];

function trend(base: number, offsets: number[], max: number): number[] {
  return offsets.map((offset) => Math.max(0, Math.min(max, base + offset)));
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function Worker() {
  const { id } = useParams();
  const worker =
    workers.find((candidate) => candidate.id === id) ?? (id ? undefined : workers[0]);

  if (!worker) {
    return (
      <Panel title="Ο εργαζόμενος δεν βρέθηκε">
        <Typography sx={{ color: "text.secondary" }}>
          Ο κωδικός εργαζομένου δεν αντιστοιχεί σε κάποια εγγραφή.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        >
          Επιστροφή στην επισκόπηση
        </Button>
      </Panel>
    );
  }

  const workerIncidents = incidents.filter(
    (incident) => incident.workerId === worker.id,
  );
  const workerAlerts = alerts.filter((alert) => alert.workerId === worker.id);
  const fatigueScore =
    worker.fatigue === "high" ? 80 : worker.fatigue === "medium" ? 55 : 30;

  const stats = [
    {
      label: "Μέση Συμμόρφωση",
      value: `${worker.complianceScore}%`,
      color:
        worker.complianceScore >= 80 ? "success.main" : "warning.main",
    },
    {
      label: "Ενεργές ειδοποιήσεις",
      value: workerAlerts.length,
      color: "warning.main",
    },
    {
      label: "Περιστατικά",
      value: workerIncidents.length,
      color: "error.main",
    },
    {
      label: "Μ.Ο Παλμών",
      value: `${worker.heartRate} bpm`,
      color: "info.main",
    },
  ];

  return (
    <>
      <Panel
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          flexWrap: "wrap",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
          <Avatar alt={worker.name} sx={{ width: 32, height: 32 }}>
            {worker.name.charAt(0)}
          </Avatar>
          <Stack>
            <Typography
              component="h2"
              sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
            >
              {worker.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              {worker.role} • {worker.site} • {worker.zone} • {worker.id}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            ml: { xs: 0, md: "auto" },
            flexWrap: "wrap",
            rowGap: 2,
          }}
        >
          {stats.map((stat) => (
            <Card
              key={stat.label}
              sx={{ minWidth: 120, bgcolor: "background.default" }}
            >
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                  {stat.label}
                </Typography>
                <Typography
                  sx={{ color: stat.color, fontSize: 16, fontWeight: 700 }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Button
          component={RouterLink}
          to={`/recommendations/${worker.id}`}
          variant="outlined"
          sx={{ flexShrink: 0 }}
        >
          Συστάσεις
        </Button>
      </Panel>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Panel title="Συμμόρφωση ΜΑΠ - τελευταίες 30 ημέρες">
            <Box
              sx={{ display: "flex", flexDirection: "row", gap: 1, height: 100 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  100%
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  50%
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <SparkLineChart
                  color="#22c55e"
                  data={trend(worker.complianceScore, complianceOffsets, 100)}
                  height={100}
                  showTooltip
                />
              </Box>
            </Box>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Panel title="Βιομετρικά - παλμοί & κόπωση">
            <SparkLineChart
              data={trend(worker.heartRate, heartRateOffsets, 140)}
              height={100}
              color="#ef4444"
              showTooltip
            />
            <SparkLineChart
              data={trend(fatigueScore, fatigueOffsets, 100)}
              height={100}
              color="#f59e0b"
              showTooltip
            />

            <Divider />

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center", flexWrap: "wrap" }}
            >
              <Typography sx={{ fontSize: 12 }}>
                <FiberManualRecordIcon fontSize="inherit" color="warning" />
                Δείκτης κόπωσης
              </Typography>
              <Typography sx={{ fontSize: 12 }}>
                <FiberManualRecordIcon fontSize="inherit" color="error" />
                Παλμοί
              </Typography>
            </Stack>
          </Panel>
        </Grid>
      </Grid>

      <Panel title="Ιστορικό περιστατικών & παραβάσεων">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Ιστορικό εργαζομένου">
            <TableHead>
              <TableRow>
                <TableCell align="left">ΗΜ/ΝΙΑ</TableCell>
                <TableCell align="left">ΤΥΠΟΣ</TableCell>
                <TableCell align="left">ΖΩΝΗ</TableCell>
                <TableCell align="left">ΣΥΝΘΗΚΕΣ</TableCell>
                <TableCell align="left">ΣΟΒΑΡΟΤΗΤΑ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workerIncidents.map((incident) => (
                <TableRow
                  key={`${incident.date}-${incident.type}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{formatDate(incident.date)}</TableCell>
                  <TableCell align="left">{incident.type}</TableCell>
                  <TableCell align="left">{worker.zone}</TableCell>
                  <TableCell align="left">
                    Βάρδια {incident.conditions.shift} •{" "}
                    {incident.conditions.tempC}°C • Κόπωση:{" "}
                    {fatigueText[incident.conditions.fatigue]}
                  </TableCell>
                  <TableCell align="left">
                    <SeverityChip severity={incident.severity} />
                  </TableCell>
                </TableRow>
              ))}
              {workerIncidents.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <Typography sx={{ color: "text.secondary", py: 2 }}>
                      Δεν καταγράφηκαν περιστατικά για αυτόν τον εργαζόμενο.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    </>
  );
}
