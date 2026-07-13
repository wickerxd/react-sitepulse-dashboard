import { useParams } from "react-router-dom";
import { workers } from "../data";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Severity } from "../components/NotificationDisplay";
import Divider from "@mui/material/Divider";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

type Zone = "Zone A" | "Zone B" | "Zone C";
type PPE = { helmet: boolean; vest: boolean; gloves: boolean };
type Fatigue = "high" | "medium" | "low";
type Role = "Ηλεκτρολόγος" | "Επιθεωρήτρια" | "Επιθεωρητής";
type Site = "Εργοτάξιο Α" | "Εργοτάξιο Β" | "Εργοτάξιο Γ";

export interface Worker {
  id: string;
  name: string;
  role: Role;
  site: Site;
  zone: Zone;
  ppe: PPE;
  compliant: boolean;
  heartRate: number;
  fatigue: Fatigue;
  battery: number;
  connected: boolean;
  complianceScore: number;
}

interface HistoryData {
  id: number;
  date: string;
  type: string;
  zone: Zone;
  conditions: string;
  severity: Severity;
}

export default function Worker() {
  const { id } = useParams();
  const worker = workers.find((w) => w.id === id);
  const severityColor: Record<Severity, string> = {
    critical: "error",
    high: "warning",
    medium: "secondary",
    low: "info",
  };

  const dataRows: HistoryData[] = [
    {
      id: 1,
      date: "08/07 09:35",
      type: "Proximity Μηχάνημα",
      zone: "Zone A",
      conditions: "Βάρδια πρωί • 36C • Κόπωση: μέτρια ",
      severity: "critical",
    },
    {
      id: 2,
      date: "06/07 19:55",
      type: "Λείπουν γάντια",
      zone: "Zone A",
      conditions: "Βάρδια βράδυ • 40C • Κόπωση: υψηλή ",
      severity: "high",
    },
    {
      id: 3,
      date: "01/07 14:35",
      type: "Λείπει κράνος",
      zone: "Zone B",
      conditions: "Βάρδια μεσημέρι • 40C • Κόπωση: μέτρια ",
      severity: "high",
    },
    {
      id: 4,
      date: "29/06 10:35",
      type: "Λείπει καφές",
      zone: "Zone A",
      conditions: "Βάρδια πρωί • 36C • Κόπωση: υψηλή ",
      severity: "low",
    },
  ];
  if (!worker) return <p>Worker not found</p>;

  return (
    <>
      <Box
        sx={{
          p: 2,
          background: "white",
          border: "2px solid grey",
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
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
              {worker?.role} • {worker?.site} • {worker?.zone} • {worker?.id}
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
          <Card sx={{ minWidth: 105, maxHeight: { sm: 90, md: 65 } }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Μέση Συμμόρφωση
              </Typography>
              <Typography
                sx={{ color: "green", fontSize: 14, fontWeight: 700 }}
              >
                88%
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 105, maxHeight: { sm: 90, md: 65 } }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Παραβάσεις (30μ)
              </Typography>
              <Typography
                sx={{ color: "orange", fontSize: 14, fontWeight: 700 }}
              >
                14
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 105, maxHeight: { sm: 90, md: 65 } }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Περιστατικά
              </Typography>
              <Typography sx={{ color: "red", fontSize: 14, fontWeight: 700 }}>
                2
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 105, maxHeight: { sm: 90, md: 65 } }}>
            <CardContent>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Μ.Ο Παλμών
              </Typography>
              <Typography
                sx={{ color: "darkblue", fontSize: 14, fontWeight: 700 }}
              >
                91 bpm
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Grid container spacing={2} sx={{ width: "100%", mx: 0, my: 2 }}>
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
            Συμμόρφωση ΜΑΠ - τελευταίες 30 ημέρες
          </Typography>

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
                color="green"
                data={[1, 4, 2, 5, 7, 2, 4, 6]}
                height={100}
              />
            </Box>
          </Box>
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
          size={{ xs: 12, md: 4 }}
        >
          <Typography
            sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
          >
            Βιομετρικά - παλμοί & κόπωση
          </Typography>

          <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
          <SparkLineChart
            color="red"
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            height={100}
          />

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <p>
              <FiberManualRecordIcon
                fontSize="inherit"
                color="info"
                sx={{ pt: 0.5 }}
              />
              Δείκτης κόπωσης
            </p>

            <p>
              <FiberManualRecordIcon
                fontSize="inherit"
                color="error"
                sx={{ pt: 0.5 }}
              />
              Παλμοί
            </p>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          p: 2,
          background: "white",
          border: "2px solid grey",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
        >
          Ιστορικό περιστατικών & παραβάσεων
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ΗΜ/ΝΙΑ</TableCell>
                <TableCell align="left">ΤΥΠΟΣ</TableCell>
                <TableCell align="left">ΖΩΝΗ</TableCell>
                <TableCell align="left">ΣΥΝΘΗΚΕΣ</TableCell>
                <TableCell align="left">ΣΟΒΑΡΟΤ.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.zone}</TableCell>
                  <TableCell align="left">{row.conditions}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.severity}
                      size="small"
                      //@ts-ignore
                      color={severityColor[row.severity]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
