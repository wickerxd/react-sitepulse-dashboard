import { useState } from "react";
import { NavLink } from "react-router-dom";

interface MenuItem {
  label: string;
  to: string;
}

const menuItems: MenuItem[] = [
  { label: "Overview", to: "/" },
  { label: "Εργαζόμενος", to: "/worker" },
  { label: "Ρόλοι", to: "/roles" },
  { label: "Εργοτάξια", to: "/construction_sites" },
  { label: "Ατυχήματα", to: "/accidents" },
  { label: "Robot", to: "/robot" },
  { label: "Συστάσεις", to: "/reccomendations" },
];

function Header() {
  return (
    <header>
      <h1>Hello there</h1>
      <nav aria-label="Main navigation">
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
