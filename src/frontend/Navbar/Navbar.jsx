import React from "react";
import "./navbar.css";
import { useTheme } from "../contexts/theme-context";

export const Navbar = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="flex space-between">
        <h1 className="main-title">Note Maker</h1>
        <span
          className="material-icons span icon"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          {darkTheme ? "light_mode" : "dark_mode"}
        </span>
      </div>
    </nav>
  );
};
