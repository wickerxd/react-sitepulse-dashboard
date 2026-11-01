import Grid from "@mui/material/Grid";
import KpiGrid from "../components/KpiGrid";
import type { Kpi } from "../components/KpiGrid";
import NotificationCenter from "../components/NotificationCenter";
import WorkerTab from "../components/WorkerTab";
import { alerts, workers } from "../data";

export default function Overview() {
  const kpis: Kpi[] = [
    { type: "text", title: "Εργαζόμενοι στο πεδίο", content: workers.length },
    {
      type: "percentage",
      title: "Συμμόρφωση ΜΑΠ",
      content:
        workers.filter((worker) => worker.compliant).length / workers.length,
    },
    { type: "text", title: "Ενεργές ειδοποιήσεις", content: alerts.length },
    {
      type: "critical",
      title: "Critical",
      content: alerts.filter((alert) => alert.severity === "critical").length,
    },
  ];

  return (
    <>
      <KpiGrid kpis={kpis} />

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 6 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <WorkerTab workers={workers} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <NotificationCenter alerts={alerts} />
        </Grid>
      </Grid>
    </>
  );
}
