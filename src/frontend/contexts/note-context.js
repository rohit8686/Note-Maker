import axios from "axios";
import { React, createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../Toast/toast";
import { useAuth } from "./auth-context";

const NoteContext = createContext();
const useNote = () => useContext(NoteContext);

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const {
    authState: { encodedToken },
  } = useAuth();

  const noteInitialState = {
    title: "",
    body: "",
    color: "#ffffff",
    label: "",
    pinned: false,
    date: `${date}/${month + 1}/${year}`,
  };

  const addNote = async () => {
    if (encodedToken) {
      try {
        const res = await axios.post(
          "/api/notes",
          { note: noteState },
          { headers: { authorization: encodedToken } }
        );
        setNotes(res.data.notes);
        noteDispatch({ type: "CLEAR_FORM" });
        localStorage.setItem("userData", JSON.stringify(res.data));
        toastContainer("Note added successfully", "success");
      } catch (e) {
        console.log("Error in adding note ", e);
      }
    } else {
      toastContainer("Login to add notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  function noteReducerFn(noteState, action) {
    switch (action.type) {
      case "ADD_TITLE":
        return { ...noteState, title: action.payload };
      case "ADD_BODY":
        return { ...noteState, body: action.payload };
      case "ADD_COLOR":
        return { ...noteState, color: action.payload };
      case "ADD_LABEL":
        return { ...noteState, label: action.payload };
      case "PINNED":
        return { ...noteState, pinned: !noteState.pinned };
      case "CLEAR_FORM":
        return { ...noteInitialState };
    }
  }

  const [noteState, noteDispatch] = useReducer(noteReducerFn, noteInitialState);

  return (
    <NoteContext.Provider
      value={{
        noteState,
        noteDispatch,
        addNote,
        notes,
        setNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
export { NoteProvider, useNote };
