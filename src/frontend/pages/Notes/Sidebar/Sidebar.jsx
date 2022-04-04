import React from "react";
import { useAsideSelected } from "../../../contexts/aside-selected-context";
import "./sidebar.css";

export const Sidebar = () => {
  const { setAsideSelected } = useAsideSelected();
  return (
    <div className="sidebar p-1 mb-1">
      <div onClick={() => setAsideSelected("note-home")} className="pointer">
        <div className="flex flex-start gap">
          <span className="material-icons-outlined">home</span>
          <h2>Home</h2>
        </div>
      </div>
      <div onClick={() => setAsideSelected("label")} className="pointer">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">label</span>
          <h2>Labels</h2>
        </div>
      </div>
      <div onClick={() => setAsideSelected("archive")} className="pointer">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">archive</span>
          <h2>Archive</h2>
        </div>
      </div>
      <div onClick={() => setAsideSelected("trash")} className="pointer">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">delete</span>
          <h2>Trash</h2>
        </div>
      </div>
      <div onClick={() => setAsideSelected("profile")} className="pointer">
        <div className="flex flex-start gap pt-1">
          <span className="material-icons-outlined">account_circle</span>
          <h2>Profile</h2>
        </div>
      </div>
    </div>
  );
};
