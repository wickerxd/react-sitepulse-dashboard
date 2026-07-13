// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "@mui/material/Container";

function Dashboard() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default Dashboard;
