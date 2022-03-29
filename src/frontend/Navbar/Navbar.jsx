import React from "react";
import "./navbar.css";
import { useTheme } from "../contexts/theme-context";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  return (
    <nav className="navbar">
      <div className="flex space-between">
        <Link to="/" className="link">
          <h1 className="main-title">Note Maker</h1>
        </Link>
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
