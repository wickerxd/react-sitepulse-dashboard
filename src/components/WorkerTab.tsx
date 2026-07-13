import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import type { Worker } from "../pages/Worker";
import { SparkLineChart } from "@mui/x-charts";
import { grey } from "@mui/material/colors";
import Collapse from "@mui/material/Collapse";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface WorkerTab {
  workers: Worker[];
}
type Filters = "All" | "NonCompliant" | "Zone_A" | "Zone_B";
type Fatigue = "high" | "medium" | "low";

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

export default function WorkerTab({ workers }: WorkerTab) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<Filters>("All");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedWorker, setSelectedWorker] = useState<Worker>();

  const filteredWorkers = workers
    .filter((worker) => {
      if (selectedFilter === "All") return true;
      if (selectedFilter === "NonCompliant") return !worker.compliant;
      if (selectedFilter === "Zone_A") return worker.zone === "Zone A";
      if (selectedFilter === "Zone_B") return worker.zone === "Zone B";
      return true;
    })
    .filter((worker) => {
      return worker.name.toLowerCase().includes(searchInput.toLowerCase());
    });

  return (
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
      <Typography sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}>
        Εργαζόμενοι
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          <Chip
            label="Όλοι"
            variant={selectedFilter === "All" ? "filled" : "outlined"}
            sx={{ flexShrink: 0 }}
            onClick={() => setSelectedFilter("All")}
          />
          <Chip
            label="Μη συμμορφ."
            variant={selectedFilter === "NonCompliant" ? "filled" : "outlined"}
            sx={{ flexShrink: 0 }}
            onClick={() => setSelectedFilter("NonCompliant")}
          />
          <Chip
            label="Zone A"
            variant={selectedFilter === "Zone_A" ? "filled" : "outlined"}
            sx={{ flexShrink: 0 }}
            onClick={() => setSelectedFilter("Zone_A")}
          />
          <Chip
            label="Zone B"
            variant={selectedFilter === "Zone_B" ? "filled" : "outlined"}
            sx={{ flexShrink: 0 }}
            onClick={() => setSelectedFilter("Zone_B")}
          />
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  align="left"
                  onClick={() => navigate(`/worker/${worker.id}`)}
                >
                  {worker.name}
                </TableCell>
                <TableCell align="left">{worker.role}</TableCell>
                <TableCell align="left">{worker.zone}</TableCell>
                <TableCell
                  align="left"
                  onClick={() => setSelectedWorker(worker)}
                >
                  {worker.compliant ? (
                    <Chip label="• ΟK" color="success" />
                  ) : (
                    <Chip label="• Μη ΟK" color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Collapse in={selectedWorker != null} timeout={400}>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            background: grey[300],
            border: "2px solid grey",
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
          >
            Λεπτομέριες: {selectedWorker?.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            {selectedWorker?.zone} • {selectedWorker?.role}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              mt: 2,
            }}
          >
            <Stack direction="column" spacing={1}>
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                ΜΑΠ
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Chip
                  label={selectedWorker?.ppe.helmet ? "ΟK ✓" : "Μη ΟK ✕"}
                  size="small"
                  color={selectedWorker?.ppe.helmet ? "success" : "error"}
                />
                <Chip
                  label={selectedWorker?.ppe.vest ? "ΟK ✓" : "Μη ΟK ✕"}
                  size="small"
                  color={selectedWorker?.ppe.vest ? "success" : "error"}
                />
                <Chip
                  label={selectedWorker?.ppe.gloves ? "ΟK ✓" : "Μη ΟK ✕"}
                  size="small"
                  color={selectedWorker?.ppe.gloves ? "success" : "error"}
                />
              </Stack>

              <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography
                sx={{ color: "text.secondary", fontSize: 12, fontWeight: 700 }}
              >
                Βιομετρικά
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                  <FavoriteIcon fontSize="inherit" color="error" />
                  {selectedWorker?.heartRate} bpm
                </Typography>
                <Typography
                  sx={{
                    color: fatigueColor[selectedWorker?.fatigue as Fatigue],
                    fontSize: 12,
                  }}
                >
                  Κόπωση: {fatigueText[selectedWorker?.fatigue as Fatigue]}
                </Typography>
              </Stack>

              <Typography
                sx={{ color: "text.secondary", fontSize: 12, fontWeight: 700 }}
              >
                Συσκευή
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Typography
                  sx={{
                    color: selectedWorker?.connected ? "green" : "red",
                    fontSize: 12,
                  }}
                >
                  <FiberManualRecordIcon
                    fontSize="inherit"
                    color={selectedWorker?.connected ? "success" : "error"}
                  />
                  {selectedWorker?.connected ? "Συνδεδεμένος" : "Αποσυνδεμένος"}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                  <BatteryChargingFullIcon fontSize="inherit" color="success" />
                  {selectedWorker?.battery}%
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
