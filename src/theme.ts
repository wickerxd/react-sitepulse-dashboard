import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#2563eb", light: "#60a5fa", dark: "#1d4ed8" },
        secondary: { main: "#0f766e" },
        success: { main: "#16a34a" },
        warning: { main: "#d97706" },
        error: { main: "#dc2626" },
        info: { main: "#0284c7" },
        background: { default: "#f5f7fb", paper: "#ffffff" },
        text: { primary: "#0f172a", secondary: "#64748b" },
        divider: "#e2e8f0",
      },
    },
    dark: {
      palette: {
        primary: { main: "#60a5fa", light: "#93c5fd", dark: "#3b82f6" },
        secondary: { main: "#2dd4bf" },
        success: { main: "#4ade80" },
        warning: { main: "#fbbf24" },
        error: { main: "#f87171" },
        info: { main: "#38bdf8" },
        background: { default: "#0b1220", paper: "#111c2e" },
        text: { primary: "#e2e8f0", secondary: "#94a3b8" },
        divider: "rgba(148, 163, 184, 0.16)",
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": { colorScheme: "light" },
        ".dark": { colorScheme: "dark" },
        body: {
          minWidth: 320,
          transition: "background-color 150ms ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid var(--mui-palette-divider)",
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "var(--mui-palette-text-secondary)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.04em",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

export default theme;
