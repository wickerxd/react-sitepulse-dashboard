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
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import KpiGrid from "../components/KpiGrid";
import type { Kpi } from "../components/KpiGrid";
import Panel from "../components/Panel";
import SeverityChip from "../components/SeverityChip";
import {
  alerts,
  incidents,
  monthlySiteCompliance,
  riskZones,
  workers,
} from "../data";
import type { Severity } from "../types";

const riskBackground: Record<Severity, string> = {
  critical: "#ffebee",
  high: "#fff3e0",
  medium: "#fffde7",
  low: "#e8f5e9",
};

const riskBorder: Record<Severity, string> = {
  critical: "#d32f2f",
  high: "#ed6c02",
  medium: "#f9a825",
  low: "#2e7d32",
};

const severityOrder: Severity[] = ["critical", "high", "medium", "low"];

const severityLabels: Record<Severity, string> = {
  critical: "Κρίσιμες",
  high: "Υψηλές",
  medium: "Μέτριες",
  low: "Χαμηλές",
};

const sites = Array.from(new Set(workers.map((worker) => worker.site)));

const siteStats = sites.map((site) => {
  const siteWorkers = workers.filter((worker) => worker.site === site);
  const workerIds = new Set(siteWorkers.map((worker) => worker.id));
  const siteAlerts = alerts.filter((alert) => workerIds.has(alert.workerId));

  return {
    site,
    workers: siteWorkers.length,
    compliance:
      siteWorkers.filter((worker) => worker.compliant).length /
      siteWorkers.length,
    alerts: siteAlerts,
    incidents: incidents.filter((incident) => incident.site === site).length,
  };
});

const totalCompliance =
  workers.filter((worker) => worker.compliant).length / workers.length;
const highRiskZones = riskZones.filter(
  (zone) => zone.risk === "critical" || zone.risk === "high",
).length;

export default function ConstructionSites() {
  const kpis: Kpi[] = [
    { type: "text", title: "Ενεργά εργοτάξια", content: sites.length },
    {
      type: "percentage",
      title: "Μέση συμμόρφωση ΜΑΠ",
      content: totalCompliance,
    },
    { type: "text", title: "Ενεργές ειδοποιήσεις", content: alerts.length },
    { type: "critical", title: "Ζώνες υψηλού κινδύνου", content: highRiskZones },
  ];

  return (
    <>
      <Typography
        component="h1"
        sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
      >
        Ανάλυση ανά εργοτάξιο
      </Typography>

      <Box sx={{ my: 2 }}>
        <KpiGrid kpis={kpis} />
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel title="Συμμόρφωση ΜΑΠ ανά εργοτάξιο">
            <BarChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: siteStats.map((stat) => stat.site),
                },
              ]}
              yAxis={[{ max: 100 }]}
              series={[
                {
                  label: "Συμμόρφωση %",
                  data: siteStats.map((stat) =>
                    Math.round(stat.compliance * 100),
                  ),
                  color: "#0288d1",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel title="Ενεργές ειδοποιήσεις ανά εργοτάξιο">
            <BarChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "band",
                  data: siteStats.map((stat) => stat.site),
                },
              ]}
              yAxis={[{ label: "Ειδοποιήσεις" }]}
              series={severityOrder.map((severity) => ({
                label: severityLabels[severity],
                stack: "alerts",
                data: siteStats.map(
                  (stat) =>
                    stat.alerts.filter((alert) => alert.severity === severity)
                      .length,
                ),
                color:
                  severity === "critical"
                    ? "#d32f2f"
                    : severity === "high"
                      ? "#ed6c02"
                      : severity === "medium"
                        ? "#0288d1"
                        : "#757575",
              }))}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel title="Μηνιαία τάση συμμόρφωσης">
            <LineChart
              height={320}
              grid={{ horizontal: true }}
              xAxis={[
                {
                  scaleType: "point",
                  data: monthlySiteCompliance.map((entry) => entry.month),
                },
              ]}
              yAxis={[{ min: 50, max: 100 }]}
              series={[
                {
                  label: "Εργοτάξιο Α",
                  data: monthlySiteCompliance.map((entry) => entry.siteA),
                  color: "#0288d1",
                },
                {
                  label: "Εργοτάξιο Β",
                  data: monthlySiteCompliance.map((entry) => entry.siteB),
                  color: "#2e7d32",
                },
                {
                  label: "Εργοτάξιο Γ",
                  data: monthlySiteCompliance.map((entry) => entry.siteC),
                  color: "#ed6c02",
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel
            title="Χάρτης ζωνών κινδύνου"
            subtitle="Ζώνες με βάση ενεργές ειδοποιήσεις και περιστατικά"
          >
            <Grid container spacing={1}>
              {riskZones.map((zone) => (
                <Grid key={`${zone.site}-${zone.zone}`} size={{ xs: 12, sm: 6 }}>
                  <Box
                    component="article"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: `2px solid ${riskBorder[zone.risk]}`,
                      background: riskBackground[zone.risk],
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                        {zone.zone}
                      </Typography>
                      <SeverityChip severity={zone.risk} />
                    </Box>
                    <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                      {zone.site}
                    </Typography>
                    <Typography sx={{ fontSize: 12, mt: 1 }}>
                      {zone.note}
                    </Typography>
                    <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                      {zone.workers} εργαζόμενοι • {zone.incidents} περιστατικά
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Σύγκριση εργοταξίων">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="Σύγκριση εργοταξίων">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ΕΡΓΟΤΑΞΙΟ</TableCell>
                    <TableCell align="left">ΕΡΓΑΖΟΜΕΝΟΙ</TableCell>
                    <TableCell align="left">ΣΥΜΜΟΡΦΩΣΗ</TableCell>
                    <TableCell align="left">ΕΙΔΟΠΟΙΗΣΕΙΣ</TableCell>
                    <TableCell align="left">ΚΡΙΣΙΜΕΣ</TableCell>
                    <TableCell align="left">ΠΕΡΙΣΤΑΤΙΚΑ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {siteStats.map((stat) => {
                    const percentage = Math.round(stat.compliance * 100);
                    const criticalAlerts = stat.alerts.filter(
                      (alert) => alert.severity === "critical",
                    ).length;

                    return (
                      <TableRow
                        key={stat.site}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{stat.site}</TableCell>
                        <TableCell align="left">{stat.workers}</TableCell>
                        <TableCell align="left">
                          <Chip
                            label={`${percentage}%`}
                            size="small"
                            color={
                              percentage >= 80
                                ? "success"
                                : percentage >= 50
                                  ? "warning"
                                  : "error"
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          {stat.alerts.length}
                        </TableCell>
                        <TableCell align="left">{criticalAlerts}</TableCell>
                        <TableCell align="left">{stat.incidents}</TableCell>
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
