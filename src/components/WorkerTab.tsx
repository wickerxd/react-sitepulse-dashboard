import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Panel from "./Panel";
import type { Fatigue, Worker, Zone } from "../types";

type Filter = "All" | "NonCompliant" | Zone;

const filters: { label: string; value: Filter }[] = [
  { label: "Όλοι", value: "All" },
  { label: "Μη συμμορφ.", value: "NonCompliant" },
  { label: "Zone A", value: "Zone A" },
  { label: "Zone B", value: "Zone B" },
  { label: "Zone C", value: "Zone C" },
];

const fatigueText: Record<Fatigue, string> = {
  high: "Υψηλή",
  medium: "Μέτρια",
  low: "Χαμηλή",
};

const fatigueColor: Record<Fatigue, string> = {
  high: "red",
  medium: "orange",
  low: "green",
};

function workerTrend(score: number): number[] {
  return [-10, -6, -3, 1, 4, 2, 0, 3, 6, 4].map((offset) =>
    Math.max(0, Math.min(100, score + offset)),
  );
}

interface WorkerTabProps {
  workers: Worker[];
}

export default function WorkerTab({ workers }: WorkerTabProps) {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("All");
  const [searchInput, setSearchInput] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<Worker>();

  const filteredWorkers = workers
    .filter((worker) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter === "NonCompliant") return !worker.compliant;
      return worker.zone === selectedFilter;
    })
    .filter((worker) =>
      worker.name.toLowerCase().includes(searchInput.toLowerCase()),
    );

  return (
    <Panel title="Εργαζόμενοι">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
      >
        <TextField
          label="Αναζήτηση"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          variant="outlined"
          size="small"
          sx={{ minWidth: { sm: 220 } }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ overflowX: "auto", flexWrap: "nowrap", pb: 1 }}
        >
          {filters.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              variant={selectedFilter === filter.value ? "filled" : "outlined"}
              sx={{ flexShrink: 0 }}
              onClick={() => setSelectedFilter(filter.value)}
            />
          ))}
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Λίστα εργαζομένων">
          <TableHead>
            <TableRow>
              <TableCell align="left">ΟΝΟΜΑ</TableCell>
              <TableCell align="left">ΡΟΛΟΣ</TableCell>
              <TableCell align="left">ΖΩΝΗ</TableCell>
              <TableCell align="left">ΜΑΠ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWorkers.map((worker) => (
              <TableRow
                key={worker.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">
                  <Link
                    component={RouterLink}
                    to={`/worker/${worker.id}`}
                    underline="hover"
                    color="inherit"
                    sx={{ fontWeight: 600 }}
                  >
                    {worker.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{worker.role}</TableCell>
                <TableCell align="left">{worker.zone}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={worker.compliant ? "• ΟK" : "• Μη ΟK"}
                    color={worker.compliant ? "success" : "error"}
                    onClick={() => setSelectedWorker(worker)}
                    aria-label={`Λεπτομέρειες ΜΑΠ για ${worker.name}`}
                  />
                </TableCell>
              </TableRow>
            ))}
            {filteredWorkers.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <Typography sx={{ color: "text.secondary", py: 2 }}>
                    Δεν βρέθηκαν εργαζόμενοι με τα επιλεγμένα φίλτρα.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Collapse in={Boolean(selectedWorker)} timeout={400} unmountOnExit>
        {selectedWorker && (
          <Box
            sx={{
              p: 2,
              background: grey[300],
              border: "2px solid grey",
              borderRadius: 2,
            }}
          >
            <Typography
              component="h3"
              sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
            >
              Λεπτομέρειες: {selectedWorker.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              {selectedWorker.zone} • {selectedWorker.role}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              <Stack direction="column" spacing={1}>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                  ΜΑΠ
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Chip
                    label={selectedWorker.ppe.helmet ? "Κράνος ΟK" : "Κράνος ✕"}
                    size="small"
                    color={selectedWorker.ppe.helmet ? "success" : "error"}
                  />
                  <Chip
                    label={selectedWorker.ppe.vest ? "Γιλέκο ΟK" : "Γιλέκο ✕"}
                    size="small"
                    color={selectedWorker.ppe.vest ? "success" : "error"}
                  />
                  <Chip
                    label={selectedWorker.ppe.gloves ? "Γάντια ΟK" : "Γάντια ✕"}
                    size="small"
                    color={selectedWorker.ppe.gloves ? "success" : "error"}
                  />
                </Stack>

                <SparkLineChart
                  data={workerTrend(selectedWorker.complianceScore)}
                  height={80}
                  color="green"
                />
              </Stack>

              <Stack direction="column" spacing={1}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Βιομετρικά
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                    <FavoriteIcon fontSize="inherit" color="error" />{" "}
                    {selectedWorker.heartRate} bpm
                  </Typography>
                  <Typography
                    sx={{
                      color: fatigueColor[selectedWorker.fatigue],
                      fontSize: 12,
                    }}
                  >
                    Κόπωση: {fatigueText[selectedWorker.fatigue]}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Συσκευή
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Typography
                    sx={{
                      color: selectedWorker.connected ? "green" : "red",
                      fontSize: 12,
                    }}
                  >
                    <FiberManualRecordIcon
                      fontSize="inherit"
                      color={selectedWorker.connected ? "success" : "error"}
                    />
                    {selectedWorker.connected
                      ? "Συνδεδεμένος"
                      : "Αποσυνδεμένος"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                    <BatteryChargingFullIcon
                      fontSize="inherit"
                      color={selectedWorker.battery > 20 ? "success" : "error"}
                    />
                    {selectedWorker.battery}%
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        )}
      </Collapse>
    </Panel>
  );
}
