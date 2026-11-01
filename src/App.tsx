import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";

const Overview = lazy(() => import("./pages/Overview"));
const Worker = lazy(() => import("./pages/Worker"));
const Roles = lazy(() => import("./pages/Roles"));
const ConstructionSites = lazy(() => import("./pages/ConstructionSites"));
const Accidents = lazy(() => import("./pages/Accidents"));
const Robot = lazy(() => import("./pages/Robot"));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const Reports = lazy(() => import("./pages/Reports"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="worker/:id" element={<Worker />} />
        <Route path="worker" element={<Worker />} />
        <Route path="roles" element={<Roles />} />
        <Route path="construction_sites" element={<ConstructionSites />} />
        <Route path="accidents" element={<Accidents />} />
        <Route path="robot" element={<Robot />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="recommendations/:id" element={<Recommendations />} />
        <Route path="reports" element={<Reports />} />
        <Route
          path="reccomendations"
          element={<Navigate to="/recommendations" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
