import React, { useEffect } from "react";
import { Note } from "../Note/Note";
import { Search } from "../Search/Search";
import "./notehome.css";
import { useNavigate } from "react-router-dom";
import { Aside } from "../Aside/Aside";

export const NoteHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="p-1 notehome-flex space-between">
      <Aside />
      <div className="note-width">
        <Search />
        <Note />
      </div>
    </div>
  );
};
