import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Header from "../components/Header";

function PageSkeleton() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        {[0, 1, 2, 3].map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, md: 3 }}>
            <Skeleton variant="rounded" height={92} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Skeleton variant="rounded" height={420} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Skeleton variant="rounded" height={420} />
        </Grid>
      </Grid>
    </Box>
  );
}

function Dashboard() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}

export default Dashboard;
