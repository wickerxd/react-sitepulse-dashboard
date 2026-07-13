export const workers = [
  {
    id: "W-101",
    name: "Γ. Παπαδόπουλος",
    role: "Ηλεκτρολόγος",
    site: "Εργοτάξιο Α",
    zone: "Zone A",
    ppe: { helmet: true, vest: true, gloves: false },
    compliant: false,
    heartRate: 96,
    fatigue: "medium",
    battery: 72,
    connected: true,
    complianceScore: 72,
  },
  {
    id: "W-102",
    name: "Μ. Ιωάννου",
    role: "Επιθεωρήτρια",
    site: "Εργοτάξιο Β",
    zone: "Zone B",
    ppe: { helmet: true, vest: true, gloves: true },
    compliant: true,
    heartRate: 78,
    fatigue: "low",
    battery: 40,
    connected: true,
    complianceScore: 95,
  },
];
export const alerts = [
  {
    id: "AL-1",
    workerId: "W-101",
    type: "proximity",
    severity: "critical",
    message: "Είσοδος σε ζώνη μηχανήματος",
    time: "09:34",
  },
  {
    id: "AL-2",
    workerId: "W-101",
    type: "ppe_violation",
    severity: "high",
    message: "Λείπουν γάντια",
    time: "09:32",
  },
];

export const incidents = [
  {
    date: "2026-06-28",
    workerId: "W-101",
    role: "Ηλεκτρολόγος",
    type: "Πτώση",
    severity: "critical",
    conditions: {
      weather: "βροχή",
      tempC: 24,
      fatigue: "high",
      ppeOk: false,
      shift: "πρωί",
    },
  },
];
export const robot = {
  model: "Unitree Go2",
  battery: 76,
  mode: "patrol",
  tempC: 34,
  gas: "normal",
  detections: [{ type: "no_helmet", zone: "Zone A", time: "09:41" }],
};

export default { workers, alerts, incidents, robot };
