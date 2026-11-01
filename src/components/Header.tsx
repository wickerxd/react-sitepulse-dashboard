import { useState, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MenuIcon from "@mui/icons-material/Menu";

interface NavItem {
  label: string;
  to: string;
}

const menuItems: NavItem[] = [
  { label: "Επισκόπηση", to: "/" },
  { label: "Εργαζόμενος", to: "/worker" },
  { label: "Ρόλοι", to: "/roles" },
  { label: "Εργοτάξια", to: "/construction_sites" },
  { label: "Ατυχήματα", to: "/accidents" },
  { label: "Robot", to: "/robot" },
  { label: "Συστάσεις", to: "/recommendations" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters component="nav" aria-label="Κύρια πλοήγηση">
          <HealthAndSafetyIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            Safe With Carmen
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Άνοιγμα μενού πλοήγησης"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={handleCloseNavMenu}
                  sx={{ "&.active": { bgcolor: "action.selected" } }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <HealthAndSafetyIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "white" }}
          />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            Safe With Carmen
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, mt: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.to}
                end={item.to === "/"}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&.active": {
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: "6px",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
