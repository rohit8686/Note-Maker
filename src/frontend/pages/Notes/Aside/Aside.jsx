import React from "react";
import "./aside.css";
import { useAsideSelected } from "../../../contexts/hooks-export";

export const Aside = () => {
  const { asideSelected, setAsideSelected } = useAsideSelected();
  return (
    <div className="aside mb-1">
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
    </div>
  );
};
