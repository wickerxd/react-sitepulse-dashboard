import Grid from "@mui/material/Grid";
import OverviewKPIs, { type KPI } from "../components/OverviewKPIs";
import NotificationCenter from "../components/NotificationCenter";
import { alerts, workers } from "../data";
import type { Alert } from "../components/NotificationDisplay";
import WorkerTab from "../components/WorkerTab";
import type { Worker } from "./Worker";

export default function Overview() {
  const KPis: KPI[] = [
    { type: "text", title: "Εργαζόμενοι στο πεδίο", content: workers.length },
    {
      type: "percentage",
      title: "Συμμόρφωση ΜΑΠ",
      content:
        workers.filter((worker) => worker.compliant).length / workers.length,
    },
    { type: "text", title: "Ενεργές ειδοποίησεις", content: alerts.length },
    {
      type: "critical",
      title: "Critical",
      content: alerts.filter((alert) => alert.severity === "critical").length,
    },
  ];
  return (
    <>
      <OverviewKPIs KPIs={KPis} />

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 6 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <WorkerTab workers={workers as Worker[]}></WorkerTab>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <NotificationCenter alerts={alerts as Alert[]} />
        </Grid>
      </Grid>
    </>
  );
}
