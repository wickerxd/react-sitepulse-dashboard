import { useParams } from "react-router-dom";

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

function WorkerDetail() {
  const { id } = useParams();
}

export default function Worker() {
  return <p>Worker</p>;
}
