import { workers } from "../data";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const recommendations = [
  {
    severity: "ΥΨΗΛΗ",
    color: "red",
    chipColor: "error",
    title: "Φόρεσε μονωτικά γάντια πριν την είσοδο στη Zone A",
    subtitle: "Βάση: 8 παραβάσεις + 1 περιστατικό τον τελευταίο μήνα",
    showButton: true,
  },
  {
    severity: "ΜΕΤΡΙΑ",
    color: "orange",
    chipColor: "warning",
    title: "Χρησιμοποίησε προστατευτικά γυαλιά στις εργασίες κοπής",
    subtitle: "Βάση: ανιχνεύσεις robot + ιστορικό ρόλου",
    showButton: true,
  },
  {
    severity: "ΜΕΤΡΙΑ",
    color: "orange",
    chipColor: "warning",
    title: "Απόφυγε βαριές εργασίες μετά την 7η ώρα βάρδιας",
    subtitle: "Βάση: κόπωση + ώρα ατυχημάτων στο ιστορικό",
    showButton: true,
  },
  {
    severity: "ΘΕΤΙΚΟ",
    color: "green",
    chipColor: "success",
    title: "Σταθερή χρήση κράνους 30 ημέρες — συνέχισε έτσι",
    subtitle: "",
    showButton: false,
  },
];

export default function Reccomendations() {
  // I would use Redux to store worker Id from the overview page
  // But let's assume first user is selected
  const worker = workers.find((w) => w.id === "W-101");

  if (!worker) return <p>Worker not found</p>;

  return (
    <>
      <Typography sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}>
        Συστάσεις Συμμόρφωσης ΜΑΠ (ΑΙ)
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 2 }}>
        <Grid
          sx={{
            p: 2,
            background: "white",
            border: "2px solid grey",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Avatar alt="User" src="" sx={{ width: 24, height: 24 }} />
            <Stack>
              <Typography
                sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
              >
                {worker?.name}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                {worker?.role} • {worker?.site}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Stack>
              <Typography sx={{ color: "text.secondary", fontSize: 12, ml: 4 }}>
                Δείκτης Συμμόρφωσης
              </Typography>
              <Gauge
                width={200}
                height={200}
                value={60}
                sx={() => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#c78c0a",
                  },
                })}
                text={({ value, valueMax }) =>
                  `${value} / ${valueMax}  \n Μέτριος`
                }
              />
            </Stack>
          </Stack>
          <Divider></Divider>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
            Κύρια Κενά ΜΑΠ
          </Typography>
          <Stack direction="column" spacing={1}>
            <Typography sx={{ color: "red", fontSize: 16 }}>
              <FiberManualRecordIcon fontSize="inherit" sx={{ pt: 0.5 }} />
              Μονωτικά γάντια - 8 παραβ./μήνα
            </Typography>
            <Typography sx={{ color: "orange", fontSize: 16 }}>
              <FiberManualRecordIcon fontSize="inherit" sx={{ pt: 0.5 }} />
              Προστασία ματιών - 4 παραβ./μήνα
            </Typography>
            <Typography sx={{ color: "green", fontSize: 16 }}>
              <FiberManualRecordIcon fontSize="inherit" sx={{ pt: 0.5 }} />
              Κράνος - εντάξει
            </Typography>
          </Stack>
          <Divider></Divider>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
            Προτεινούμενη Εκπαίδευση
          </Typography>
          <Stack direction="column" spacing={1}>
            <Typography sx={{ fontSize: 16 }}>
              <MenuBookIcon fontSize="inherit" sx={{ pt: 0.5 }} />
              Σωστή χρήση ΜΑΠ (refresher)
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              <MenuBookIcon fontSize="inherit" sx={{ pt: 0.5 }} />
              Ηλεκτρική Ασφάλεια και μόνωση
            </Typography>
          </Stack>
        </Grid>

        <Grid
          sx={{
            p: 2,
            background: "white",
            border: "2px solid grey",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          size={{ xs: 12, md: 8 }}
        >
          <Typography
            sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
          >
            Εξατομικευμένες συστάσεις
          </Typography>

          <Stack direction="column" spacing={1}>
            {recommendations.map((rec, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  borderTop: `2px solid ${rec.color}`,
                  borderRight: `2px solid ${rec.color}`,
                  borderBottom: `2px solid ${rec.color}`,
                  borderLeft: `8px solid ${rec.color}`,
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  <Chip
                    label={rec.severity}
                    //@ts-ignore
                    color={rec.chipColor}
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
                    {rec.title}
                  </Typography>
                  {rec.subtitle && (
                    <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                      {rec.subtitle}
                    </Typography>
                  )}
                </Box>

                {rec.showButton && (
                  <Button variant="contained" sx={{ flexShrink: 0 }}>
                    Αποστολή
                  </Button>
                )}
              </Box>
            ))}
          </Stack>

          <Divider />
          <Typography
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
        </Grid>
      </Grid>
    </>
  );
}
