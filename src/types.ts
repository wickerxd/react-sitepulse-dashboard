export type Zone = "Zone A" | "Zone B" | "Zone C";
export type Fatigue = "high" | "medium" | "low";
export type Severity = "critical" | "high" | "medium" | "low";
export type AlertType = "proximity" | "ppe_violation" | "obstacle" | "gas_leak";
export type Role =
  | "Ηλεκτρολόγος"
  | "Επιθεωρήτρια"
  | "Επιθεωρητής"
  | "Χειριστής κλαρκ"
  | "Χειριστής γερανού"
  | "Συγκολλητής";
export type Site = "Εργοτάξιο Α" | "Εργοτάξιο Β" | "Εργοτάξιο Γ";
export type Shift = "πρωί" | "μεσημέρι" | "βράδυ";
export type Weather = "καθαρός" | "βροχή" | "ζέστη" | "άνεμος";
export type GasLevel = "normal" | "warning" | "critical";
export type DetectionType =
  | "no_helmet"
  | "no_gloves"
  | "obstacle"
  | "gas_leak"
  | "proximity";

export interface PPE {
  helmet: boolean;
  vest: boolean;
  gloves: boolean;
}

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

export interface Alert {
  id: string;
  workerId: string;
  type: AlertType;
  severity: Severity;
  message: string;
  time: string;
}

export interface IncidentConditions {
  weather: Weather;
  tempC: number;
  fatigue: Fatigue;
  ppeOk: boolean;
  shift: Shift;
}

export interface Incident {
  date: string;
  workerId: string;
  role: Role;
  site: Site;
  type: string;
  severity: Severity;
  conditions: IncidentConditions;
}

export interface Detection {
  id: string;
  type: DetectionType;
  zone: Zone;
  time: string;
  confidence: number;
}

export interface ZoneCoverage {
  zone: Zone;
  coverage: number;
  risk: Severity;
}

export interface RobotStatus {
  model: string;
  battery: number;
  mode: string;
  tempC: number;
  gas: GasLevel;
  connected: boolean;
  detections: Detection[];
  coverage: ZoneCoverage[];
}

export interface MonthlySiteCompliance {
  month: string;
  siteA: number;
  siteB: number;
  siteC: number;
}

export interface ShiftHourAccidents {
  hour: string;
  accidents: number;
}

export interface DetectionHour {
  time: string;
  detections: number;
}

export interface RiskZone {
  zone: Zone;
  site: Site;
  risk: Severity;
  workers: number;
  incidents: number;
  note: string;
}
