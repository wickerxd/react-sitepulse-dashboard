import { useState, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MuiMenuItem from "@mui/material/MenuItem";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
interface NavItem {
  label: string;
  to: string;
}

const menuItems: NavItem[] = [
  { label: "Overview", to: "/" },
  { label: "Εργαζόμενος", to: "/worker" },
  { label: "Ρόλοι", to: "/roles" },
  { label: "Εργοτάξια", to: "/construction_sites" },
  { label: "Ατυχήματα", to: "/accidents" },
  { label: "Robot", to: "/robot" },
  { label: "Συστάσεις", to: "/reccomendations" },
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
        <Toolbar disableGutters component="nav" aria-label="Main navigation">
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
              aria-label="open navigation menu"
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
                <MuiMenuItem
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {item.label}
                  </Typography>
                </MuiMenuItem>
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
                sx={{ my: 2, color: "white", display: "block" }}
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
