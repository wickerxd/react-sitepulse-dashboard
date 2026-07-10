// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <>
      <Header />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;
