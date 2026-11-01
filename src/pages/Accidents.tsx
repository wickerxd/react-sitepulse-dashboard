import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import KpiGrid from "../components/KpiGrid";
import type { Kpi } from "../components/KpiGrid";
import Panel from "../components/Panel";
import SeverityChip from "../components/SeverityChip";
import { accidentsByShiftHour, incidents, workers } from "../data";
import type { Fatigue, Weather } from "../types";

const monthLabels = [
  "Ιαν",
  "Φεβ",
  "Μαρ",
  "Απρ",
  "Μάι",
  "Ιουν",
  "Ιουλ",
  "Αυγ",
  "Σεπ",
  "Οκτ",
  "Νοε",
  "Δεκ",
];

const weatherLabels: Record<Weather, string> = {
  καθαρός: "Καθαρός",
  βροχή: "Βροχή",
  ζέστη: "Ζέστη",
  άνεμος: "Άνεμος",
};

const fatigueLabels: Record<Fatigue, string> = {
  low: "Χαμηλή",
  medium: "Μέτρια",
  high: "Υψηλή",
};

const fatigueColors: Record<Fatigue, "success" | "warning" | "error"> = {
  low: "success",
  medium: "warning",
  high: "error",
};

const accidentsByMonth = monthLabels.slice(0, 6).map((month, index) => ({
  month,
  accidents: incidents.filter(
    (incident) => Number(incident.date.split("-")[1]) - 1 === index,
  ).length,
}));

const weatherData = (Object.keys(weatherLabels) as Weather[]).map(
  (weather, index) => ({
    id: index,
    value: incidents.filter(
      (incident) => incident.conditions.weather === weather,
    ).length,
    label: weatherLabels[weather],
  }),
);

const fatigueData = (["low", "medium", "high"] as Fatigue[]).map(
  (fatigue) => ({
    fatigue,
    label: fatigueLabels[fatigue],
    value: incidents.filter(
      (incident) => incident.conditions.fatigue === fatigue,
    ).length,
  }),
);

const mostCommonWeather = weatherData.reduce((current, entry) =>
  entry.value > current.value ? entry : current,
);

const averageTemperature = Math.round(
  incidents.reduce(
    (total, incident) => total + incident.conditions.tempC,
    0,
  ) / incidents.length,
);

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function Accidents() {
  const kpis: Kpi[] = [
    { type: "text", title: "Σύνολο ατυχημάτων", content: incidents.length },
    {
      type: "critical",
      title: "Κρίσιμα περιστατικά",
      content: incidents.filter((incident) => incident.severity === "critical")
        .length,
    },
    {
      type: "text",
      title: "Συχνότερη συνθήκη",
      content: `Καιρός: ${mostCommonWeather.label}`,
    },
    {
      type: "text",
      title: "Μ.Ο. θερμοκρασίας",
      content: `${averageTemperature}°C`,
    },
  ];

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <KpiGrid kpis={kpis} />
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel title="Ατυχήματα ανά μήνα">
            <BarChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: accidentsByMonth.map((entry) => entry.month),
                },
              ]}
              yAxis={[{ label: "Ατυχήματα" }]}
              series={[
                {
                  label: "Ατυχήματα",
                  data: accidentsByMonth.map((entry) => entry.accidents),
                  color: "#d32f2f",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel title="Ατυχήματα ανά ώρα βάρδιας">
            <BarChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: accidentsByShiftHour.map((entry) => entry.hour),
                },
              ]}
              yAxis={[{ label: "Ατυχήματα" }]}
              series={[
                {
                  label: "Ατυχήματα",
                  data: accidentsByShiftHour.map((entry) => entry.accidents),
                  color: "#ed6c02",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Panel title="Καιρικές συνθήκες">
            <PieChart
              height={300}
              series={[
                {
                  innerRadius: "35%",
                  paddingAngle: 2,
                  data: weatherData,
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Panel title="Επίπεδο κόπωσης">
            <BarChart
              height={300}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: fatigueData.map((entry) => entry.label),
                },
              ]}
              yAxis={[{ label: "Ατυχήματα" }]}
              series={[
                {
                  label: "Ατυχήματα",
                  data: fatigueData.map((entry) => entry.value),
                  color: "#7b1fa2",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Μητρώο ατυχημάτων">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 950 }} aria-label="Μητρώο ατυχημάτων">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ΗΜ/ΝΙΑ</TableCell>
                    <TableCell align="left">ΕΡΓΑΖΟΜΕΝΟΣ</TableCell>
                    <TableCell align="left">ΡΟΛΟΣ</TableCell>
                    <TableCell align="left">ΤΥΠΟΣ</TableCell>
                    <TableCell align="left">ΣΟΒΑΡΟΤΗΤΑ</TableCell>
                    <TableCell align="left">ΚΑΙΡΟΣ</TableCell>
                    <TableCell align="left">ΘΕΡΜ.</TableCell>
                    <TableCell align="left">ΚΟΠΩΣΗ</TableCell>
                    <TableCell align="left">ΜΑΠ</TableCell>
                    <TableCell align="left">ΒΑΡΔΙΑ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incidents.map((incident) => {
                    const worker = workers.find(
                      (candidate) => candidate.id === incident.workerId,
                    );

                    return (
                      <TableRow
                        key={`${incident.date}-${incident.workerId}-${incident.type}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {formatDate(incident.date)}
                        </TableCell>
                        <TableCell align="left">
                          {worker?.name ?? "Άγνωστος"}
                        </TableCell>
                        <TableCell align="left">{incident.role}</TableCell>
                        <TableCell align="left">{incident.type}</TableCell>
                        <TableCell align="left">
                          <SeverityChip severity={incident.severity} />
                        </TableCell>
                        <TableCell align="left">
                          {weatherLabels[incident.conditions.weather]}
                        </TableCell>
                        <TableCell align="left">
                          {incident.conditions.tempC}°C
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={
                              fatigueLabels[incident.conditions.fatigue]
                            }
                            size="small"
                            color={fatigueColors[incident.conditions.fatigue]}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={incident.conditions.ppeOk ? "ΟΚ" : "Μη ΟΚ"}
                            size="small"
                            color={
                              incident.conditions.ppeOk ? "success" : "error"
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          {incident.conditions.shift}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
