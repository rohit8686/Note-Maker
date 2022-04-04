import React, { useState } from "react";
import "./navbar.css";
import { useTheme } from "../contexts/theme-context";
import { Link } from "react-router-dom";
import { Sidebar } from "../pages/Notes/Sidebar/Sidebar";

export const Navbar = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="flex space-between">
          <Link to="/" className="link">
            <h1 className="main-title">Note Maker</h1>
          </Link>
          <div className="flex gap">
            <span
              className="material-icons span icon"
              onClick={() => setDarkTheme(!darkTheme)}
            >
              {darkTheme ? "light_mode" : "dark_mode"}
            </span>
            <span
              className="material-icons span icon menu-icon"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? "close" : "menu"}
            </span>
          </div>
        </div>
      </nav>
      {showSidebar && <Sidebar />}
    </div>
  );
};
