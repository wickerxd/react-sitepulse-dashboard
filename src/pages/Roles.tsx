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
import { incidents, workers } from "../data";
import type { Role } from "../types";

const violationLabels = {
  helmet: "Κράνος",
  vest: "Γιλέκο",
  gloves: "Γάντια",
};

function roleStatsFor(role: Role) {
  const roleWorkers = workers.filter((worker) => worker.role === role);
  const roleIncidents = incidents.filter((incident) => incident.role === role);
  const compliance =
    roleWorkers.filter((worker) => worker.compliant).length /
    roleWorkers.length;
  const violations = {
    helmet: roleWorkers.filter((worker) => !worker.ppe.helmet).length,
    vest: roleWorkers.filter((worker) => !worker.ppe.vest).length,
    gloves: roleWorkers.filter((worker) => !worker.ppe.gloves).length,
  };
  const [topKey, topCount] = Object.entries(violations).sort(
    ([, first], [, second]) => second - first,
  )[0] as [keyof typeof violations, number];

  return {
    role,
    workers: roleWorkers.length,
    compliance,
    violations,
    topViolation: topCount > 0 ? violationLabels[topKey] : "Καμία",
    incidents: roleIncidents.length,
  };
}

const roles = Array.from(new Set(workers.map((worker) => worker.role)));
const roleStats = roles.map(roleStatsFor);
const totalCompliance =
  workers.filter((worker) => worker.compliant).length / workers.length;
const totalViolations = workers.reduce(
  (total, worker) =>
    total +
    Number(!worker.ppe.helmet) +
    Number(!worker.ppe.vest) +
    Number(!worker.ppe.gloves),
  0,
);

export default function Roles() {
  const kpis: Kpi[] = [
    { type: "text", title: "Ρόλοι στο πεδίο", content: roleStats.length },
    {
      type: "percentage",
      title: "Μέση συμμόρφωση ΜΑΠ",
      content: totalCompliance,
    },
    { type: "text", title: "Παραβάσεις ΜΑΠ", content: totalViolations },
    { type: "critical", title: "Περιστατικά", content: incidents.length },
  ];

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <KpiGrid kpis={kpis} />
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Panel title="Συμμόρφωση ΜΑΠ ανά ρόλο">
            <BarChart
              height={320}
              layout="horizontal"
              margin={{ left: 140 }}
              grid={{ vertical: true }}
              yAxis={[
                {
                  scaleType: "band",
                  data: roleStats.map((stat) => stat.role),
                },
              ]}
              xAxis={[{ max: 100 }]}
              series={[
                {
                  label: "Συμμόρφωση %",
                  data: roleStats.map((stat) =>
                    Math.round(stat.compliance * 100),
                  ),
                  color: "#2e7d32",
                },
              ]}
              hideLegend
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Panel title="Κατανομή περιστατικών ανά ρόλο">
            <PieChart
              height={320}
              series={[
                {
                  innerRadius: "35%",
                  paddingAngle: 2,
                  data: roleStats.map((stat, index) => ({
                    id: index,
                    value: stat.incidents,
                    label: stat.role,
                  })),
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Συχνότερες παραβάσεις ανά ρόλο">
            <BarChart
              height={320}
              layout="horizontal"
              margin={{ left: 140 }}
              grid={{ vertical: true }}
              yAxis={[
                {
                  scaleType: "band",
                  data: roleStats.map((stat) => stat.role),
                },
              ]}
              xAxis={[{ label: "Παραβάσεις" }]}
              series={[
                {
                  label: "Κράνος",
                  data: roleStats.map((stat) => stat.violations.helmet),
                  stack: "violations",
                  color: "#d32f2f",
                },
                {
                  label: "Γιλέκο",
                  data: roleStats.map((stat) => stat.violations.vest),
                  stack: "violations",
                  color: "#ed6c02",
                },
                {
                  label: "Γάντια",
                  data: roleStats.map((stat) => stat.violations.gloves),
                  stack: "violations",
                  color: "#0288d1",
                },
              ]}
            />
          </Panel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Panel title="Σύνοψη ρόλων">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="Σύνοψη ρόλων">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ΡΟΛΟΣ</TableCell>
                    <TableCell align="left">ΕΡΓΑΖΟΜΕΝΟΙ</TableCell>
                    <TableCell align="left">ΣΥΜΜΟΡΦΩΣΗ</TableCell>
                    <TableCell align="left">ΣΥΧΝΟΤΕΡΗ ΠΑΡΑΒΑΣΗ</TableCell>
                    <TableCell align="left">ΠΕΡΙΣΤΑΤΙΚΑ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleStats.map((stat) => {
                    const percentage = Math.round(stat.compliance * 100);
                    return (
                      <TableRow
                        key={stat.role}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{stat.role}</TableCell>
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
                        <TableCell align="left">{stat.topViolation}</TableCell>
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
