import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { alerts, workers } from "../data";
import type { ReactNode } from "react";

export const drawerWidth = 264;

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: "Επισκόπηση", to: "/", icon: <DashboardRoundedIcon /> },
  { label: "Εργαζόμενοι", to: "/worker", icon: <GroupsRoundedIcon /> },
  { label: "Ρόλοι", to: "/roles", icon: <WorkOutlineRoundedIcon /> },
  {
    label: "Εργοτάξια",
    to: "/construction_sites",
    icon: <LocationCityRoundedIcon />,
  },
  {
    label: "Ατυχήματα",
    to: "/accidents",
    icon: <ReportProblemRoundedIcon />,
  },
  { label: "Ρομπότ", to: "/robot", icon: <SmartToyRoundedIcon /> },
  {
    label: "Συστάσεις",
    to: "/recommendations",
    icon: <TipsAndUpdatesRoundedIcon />,
  },
  {
    label: "Αναφορές",
    to: "/reports",
    icon: <AssessmentRoundedIcon />,
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        spacing={1.25}
        sx={{ alignItems: "center", px: 2.5, py: 2.5 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            boxShadow: "0 8px 20px rgba(37, 99, 235, 0.24)",
          }}
        >
          <MonitorHeartRoundedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
            SitePulse
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Safety Operations
          </Typography>
        </Box>
      </Stack>

      <Divider />

      <List sx={{ px: 1.5, py: 1.5, overflowY: "auto" }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={item.to === "/"}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: "text.secondary",
              "& .MuiListItemIcon-root": { color: "inherit", minWidth: 40 },
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
              "&.active": {
                bgcolor: "action.selected",
                color: "primary.main",
                "& .MuiListItemIcon-root": { color: "primary.main" },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography
              sx={{ fontSize: 14, fontWeight: "inherit", lineHeight: 1.4 }}
            >
              {item.label}
            </Typography>
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Box
          sx={{
            p: 1.75,
            borderRadius: 2,
            bgcolor: "background.default",
            border: 1,
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
                boxShadow: "0 0 0 4px rgba(22, 163, 74, 0.12)",
              }}
            />
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
              Σύστημα ενεργό
            </Typography>
          </Stack>
          <Typography sx={{ color: "text.secondary", fontSize: 12, mt: 0.75 }}>
            {workers.length} εργαζόμενοι • {alerts.length} ειδοποιήσεις
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 11,
            textAlign: "center",
            mt: 1.5,
          }}
        >
          SitePulse v1.0
        </Typography>
      </Box>
    </Box>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <Box
      component="nav"
      aria-label="Πλαϊνή πλοήγηση"
      sx={{ width: { xs: 0, md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
          },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}
