import React, { useEffect } from "react";
import { Note } from "../Note/Note";
import "./notehome.css";
import { useNavigate } from "react-router-dom";
import { Aside } from "../Aside/Aside";
import { Archive } from "../Archive/Archive";
import { useAsideSelected } from "../../../contexts/hooks-export";
import { Labels } from "../Labels/Labels";
import { Trash } from "../Trash/Trash";
import { Profile } from "../Profile/Profile";

export const NoteHome = () => {
  const navigate = useNavigate();
  const { asideSelected } = useAsideSelected();
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-1 notehome-flex space-between">
      <Aside />
      <div className="note-width">
        {asideSelected === "note-home" && <Note />}
        {asideSelected === "archive" && <Archive />}
        {asideSelected === "label" && <Labels />}
        {asideSelected === "trash" && <Trash />}
        {asideSelected === "profile" && <Profile />}
      </div>
    </div>
  );
};
