import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Panel from "../components/Panel";
import { workers } from "../data";
import type { Worker } from "../types";

type RecommendationTone = "error" | "warning" | "success";

interface Recommendation {
  id: string;
  severity: string;
  tone: RecommendationTone;
  title: string;
  subtitle: string;
  showButton: boolean;
}

const tones = {
  high: { tone: "error" },
  medium: { tone: "warning" },
  positive: { tone: "success" },
} satisfies Record<string, { tone: RecommendationTone }>;

function buildRecommendations(worker: Worker): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (!worker.ppe.gloves) {
    recommendations.push({
      id: "gloves",
      severity: "ΥΨΗΛΗ",
      ...tones.high,
      title: "Φόρεσε μονωτικά γάντια πριν την είσοδο στη ζώνη εργασίας",
      subtitle: "Βάση: 8 παραβάσεις + 1 περιστατικό τον τελευταίο μήνα",
      showButton: true,
    });
  }

  if (!worker.ppe.helmet) {
    recommendations.push({
      id: "helmet",
      severity: "ΥΨΗΛΗ",
      ...tones.high,
      title: "Χρησιμοποίησε κράνος σε όλη τη διάρκεια της βάρδιας",
      subtitle: "Βάση: ανιχνεύσεις ρομπότ και ιστορικό παραβάσεων",
      showButton: true,
    });
  }

  if (worker.role === "Συγκολλητής") {
    recommendations.push({
      id: "goggles",
      severity: "ΜΕΤΡΙΑ",
      ...tones.medium,
      title: "Χρησιμοποίησε προστατευτικά γυαλιά στις εργασίες κοπής",
      subtitle: "Βάση: ανιχνεύσεις ρομπότ + ιστορικό ρόλου",
      showButton: true,
    });
  }

  if (worker.fatigue === "high") {
    recommendations.push({
      id: "fatigue",
      severity: "ΜΕΤΡΙΑ",
      ...tones.medium,
      title: "Απόφυγε βαριές εργασίες μετά την 7η ώρα βάρδιας",
      subtitle: "Βάση: κόπωση + ώρα ατυχημάτων στο ιστορικό",
      showButton: true,
    });
  }

  recommendations.push({
    id: "positive",
    severity: "ΘΕΤΙΚΟ",
    ...tones.positive,
    title: "Σταθερή χρήση εξοπλισμού τις τελευταίες 30 ημέρες",
    subtitle: "",
    showButton: false,
  });

  return recommendations;
}

export default function Recommendations() {
  const { id } = useParams();
  const worker = workers.find((candidate) => candidate.id === id) ?? workers[0];
  const recommendations = buildRecommendations(worker);
  const gaugeColor =
    worker.complianceScore >= 80
      ? "#22c55e"
      : worker.complianceScore >= 60
        ? "#f59e0b"
        : "#ef4444";
  const gaugeLabel =
    worker.complianceScore >= 80
      ? "Υψηλός"
      : worker.complianceScore >= 60
        ? "Μέτριος"
        : "Χαμηλός";
  const ppeGaps = [
    {
      label: "Μονωτικά γάντια",
      ok: worker.ppe.gloves,
      detail: worker.ppe.gloves ? "εντάξει" : "8 παραβ./μήνα",
    },
    {
      label: "Προστασία ματιών",
      ok: worker.role !== "Συγκολλητής",
      detail: worker.role !== "Συγκολλητής" ? "εντάξει" : "4 παραβ./μήνα",
    },
    {
      label: "Κράνος",
      ok: worker.ppe.helmet,
      detail: worker.ppe.helmet ? "εντάξει" : "λείπει",
    },
  ];

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%", mx: 0 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Panel sx={{ alignItems: "center" }}>
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
                  {worker.role} • {worker.site}
                </Typography>
              </Stack>
            </Stack>

            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              Δείκτης Συμμόρφωσης
            </Typography>
            <Gauge
              width={200}
              height={200}
              value={worker.complianceScore}
              sx={() => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: gaugeColor,
                },
              })}
              text={({ value, valueMax }) =>
                `${value} / ${valueMax}\n${gaugeLabel}`
              }
            />

            <Divider sx={{ width: "100%" }} />

            <Typography component="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
              Κύρια Κενά ΜΑΠ
            </Typography>
            <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
              {ppeGaps.map((gap) => (
                <Typography
                  key={gap.label}
                  sx={{
                    color: gap.ok
                      ? "success.main"
                      : gap.label === "Κράνος"
                        ? "error.main"
                        : "warning.main",
                    fontSize: 16,
                  }}
                >
                  <FiberManualRecordIcon fontSize="inherit" sx={{ pt: 0.5 }} />
                  {gap.label} - {gap.detail}
                </Typography>
              ))}
            </Stack>

            <Divider sx={{ width: "100%" }} />

            <Typography component="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
              Προτεινόμενη Εκπαίδευση
            </Typography>
            <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: 16 }}>
                <MenuBookIcon fontSize="inherit" sx={{ pt: 0.5 }} />
                Σωστή χρήση ΜΑΠ (refresher)
              </Typography>
              <Typography sx={{ fontSize: 16 }}>
                <MenuBookIcon fontSize="inherit" sx={{ pt: 0.5 }} />
                Ηλεκτρική ασφάλεια και μόνωση
              </Typography>
            </Stack>
          </Panel>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Panel title="Εξατομικευμένες συστάσεις">
            <Stack direction="column" spacing={1}>
              {recommendations.map((recommendation) => (
                <Box
                  key={recommendation.id}
                  component="article"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: `${recommendation.tone}.main`,
                    borderLeftWidth: 6,
                    bgcolor: "background.default",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { sm: "center" },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Chip
                      label={recommendation.severity}
                      color={recommendation.tone}
                      size="small"
                      sx={{ width: "fit-content" }}
                    />
                    <Typography
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      {recommendation.title}
                    </Typography>
                    {recommendation.subtitle && (
                      <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                        {recommendation.subtitle}
                      </Typography>
                    )}
                  </Box>

                  {recommendation.showButton && (
                    <Button variant="contained" sx={{ flexShrink: 0 }}>
                      Αποστολή
                    </Button>
                  )}
                </Box>
              ))}
            </Stack>

            <Divider />
            <Typography
              component="h3"
              sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
            >
              Πηγές δεδομένων
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Chip label="Wearable αισθητήρες" />
              <Chip label="Unitree robot" />
              <Chip label="Ιστορικό περιστατικών" />
            </Box>
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
