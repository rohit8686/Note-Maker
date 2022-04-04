import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar p-1 mb-1">
      <Link to="/notehome" className="link">
        <div className="flex flex-start gap">
          <span className="material-icons-outlined">home</span>
          <h2>Home</h2>
        </div>
      </Link>
      <Link to="/label" className="link">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">label</span>
          <h2>Labels</h2>
        </div>
      </Link>
      <Link to="/archive" className="link">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">archive</span>
          <h2>Archive</h2>
        </div>
      </Link>
      <Link to="/trash" className="link">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">delete</span>
          <h2>Trash</h2>
        </div>
      </Link>
      <Link to="/profile" className="link">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">account_circle</span>
          <h2>Profile</h2>
        </div>
      </Link>
    </div>
  );
};
