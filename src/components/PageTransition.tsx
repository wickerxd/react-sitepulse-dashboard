import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();

  return (
    <Box key={pathname} className="page-transition">
      {children}
    </Box>
  );
}
