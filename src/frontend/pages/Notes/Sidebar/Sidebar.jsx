import React from "react";
import { Link } from "react-router-dom";
import { useAsideSelected } from "../../../contexts/hooks-export";
import "./sidebar.css";

export const Sidebar = () => {
  const { asideSelected, setAsideSelected } = useAsideSelected();
  return (
    <div className="sidebar p-1 mb-1">
      <Link to="/notehome" className="link">
        <div
          onClick={() => setAsideSelected("note-home")}
          className={`pointer ${
            asideSelected === "note-home" ? "note-home-underline" : ""
          }`}
        >
          <div className="flex flex-start gap">
            <span className="material-icons-outlined">home</span>
            <h2>Home</h2>
          </div>
        </div>
      </Link>
      <Link to="/notehome" className="link">
        <div
          onClick={() => setAsideSelected("label")}
          className={`pointer ${
            asideSelected === "label" ? "label-underline" : ""
          }`}
        >
          <div className="flex flex-start gap pt-1">
            <span className="material-icons-outlined">label</span>
            <h2>Labels</h2>
          </div>
        </div>
      </Link>
      <Link to="/notehome" className="link">
        <div
          onClick={() => setAsideSelected("archive")}
          className={`pointer ${
            asideSelected === "archive" ? "archive-underline" : ""
          }`}
        >
          <div className="flex flex-start gap pt-1">
            <span className="material-icons-outlined">archive</span>
            <h2>Archive</h2>
          </div>
        </div>
      </Link>
      <Link to="/notehome" className="link">
        <div
          onClick={() => setAsideSelected("trash")}
          className={`pointer ${
            asideSelected === "trash" ? "trash-underline" : ""
          }`}
        >
          <div className="flex flex-start gap pt-1">
            <span className="material-icons-outlined">delete</span>
            <h2>Trash</h2>
          </div>
        </div>
      </Link>
      <Link to="/notehome" className="link">
        <div
          onClick={() => setAsideSelected("profile")}
          className={`pointer ${
            asideSelected === "profile" ? "profile-underline" : ""
          }`}
        >
          <div className="flex flex-start gap pt-1">
            <span className="material-icons-outlined">account_circle</span>
            <h2>Profile</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
