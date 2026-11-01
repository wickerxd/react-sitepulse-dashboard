import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ColorModeToggle from "./ColorModeToggle";
import { alerts } from "../data";

interface PageMeta {
  title: string;
  subtitle: string;
}

const defaultMeta: PageMeta = {
  title: "Επισκόπηση",
  subtitle: "Κατάσταση ασφάλειας σε πραγματικό χρόνο",
};

const pageMeta: Record<string, PageMeta> = {
  "/": defaultMeta,
  "/worker": {
    title: "Εργαζόμενοι",
    subtitle: "Συμμόρφωση ΜΑΠ, βιομετρικά και ιστορικό",
  },
  "/roles": {
    title: "Ανάλυση ρόλων",
    subtitle: "Σύγκριση συμμόρφωσης και παραβάσεων ανά θέση",
  },
  "/construction_sites": {
    title: "Εργοτάξια",
    subtitle: "Κίνδυνος, ειδοποιήσεις και τάσεις ανά εγκατάσταση",
  },
  "/accidents": {
    title: "Ατυχήματα",
    subtitle: "Τάσεις, συνθήκες και μητρώο περιστατικών",
  },
  "/robot": {
    title: "Ρομπότ",
    subtitle: "Ζωντανή περιπολία, ανιχνεύσεις και κάλυψη ζωνών",
  },
  "/recommendations": {
    title: "Συστάσεις",
    subtitle: "Εξατομικευμένες προτάσεις ασφάλειας",
  },
  "/reports": {
    title: "Αναφορές",
    subtitle: "Ιστορικό, προγραμματισμοί και εξαγωγές δεδομένων",
  },
};

function getPageMeta(pathname: string): PageMeta {
  if (pathname.startsWith("/worker/")) {
    return {
      title: "Προφίλ εργαζομένου",
      subtitle: "Αναλυτική εικόνα συμμόρφωσης και υγείας",
    };
  }
  if (pathname.startsWith("/recommendations/")) {
    return {
      title: "Συστάσεις εργαζομένου",
      subtitle: "Προτεραιότητες και προτεινόμενες ενέργειες",
    };
  }
  return pageMeta[pathname] ?? defaultMeta;
}

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        backgroundImage: "none",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 76 },
          gap: 1,
          px: { xs: 2, md: 3 },
        }}
      >
        <IconButton
          aria-label="Άνοιγμα πλοήγησης"
          onClick={onOpenSidebar}
          sx={{ display: { md: "none" } }}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 18, md: 22 },
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {meta.title}
          </Typography>
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            {meta.subtitle}
          </Typography>
        </Box>

        <Chip
          label="Live"
          color="success"
          size="small"
          variant="outlined"
          sx={{ display: { xs: "none", lg: "inline-flex" } }}
        />
        <ColorModeToggle />
        <Tooltip title="Ειδοποιήσεις">
          <IconButton aria-label="Ειδοποιήσεις">
            <Badge badgeContent={alerts.length} color="error">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Avatar
          alt="Επόπτης"
          sx={{
            width: 34,
            height: 34,
            bgcolor: "primary.main",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          ΕΠ
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
