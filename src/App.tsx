// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import Accidents from "./pages/Accidents";
import ConstructionSites from "./pages/ConstructionSites";
import Overview from "./pages/Overview";
import Reccomendations from "./pages/Reccomendations";
import Robot from "./pages/Robot";
import Roles from "./pages/Roles";
import Worker from "./pages/Worker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="worker" element={<Worker />} />
        <Route path="roles" element={<Roles />} />
        <Route path="construction_sites" element={<ConstructionSites />} />
        <Route path="accidents" element={<Accidents />} />
        <Route path="robot" element={<Robot />} />
        <Route path="reccomendations" element={<Reccomendations />} />
      </Route>
    </Routes>
  );
}

export default App;
