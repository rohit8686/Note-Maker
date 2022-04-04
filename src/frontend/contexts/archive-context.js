import axios from "axios";
import { React, createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../Toast/toast";
import { useAuth } from "./auth-context";
import { useEdit } from "./edit-context";
import { useNote } from "./note-context";

const ArchiveContext = createContext();
const useArchive = () => useContext(ArchiveContext);

function ArchiveProvider({ children }) {
  const { notes, setNotes } = useNote();
  const navigate = useNavigate();
  const {
    authState: { encodedToken },
  } = useAuth();
  const { editState, editDispatch } = useEdit();

  const archiveInitialState = {
    archiveData: [],
  };

  const addToArchive = async (_id) => {
    const noteToArchive = notes.find((note) => note._id === _id);
    if (encodedToken) {
      try {
        const res = await axios.post(
          `/api/notes/archives/${_id}`,
          { note: noteToArchive },
          { headers: { authorization: encodedToken } }
        );
        setNotes(res.data.notes);
        archiveDispatch({ type: "ARCHIVE_DATA", payload: res.data.archives });
        localStorage.setItem("userData", JSON.stringify(res.data));
        toastContainer("Note archived successfully", "success");
      } catch (e) {
        console.log("Note archive error", e);
      }
    } else {
      toastContainer("Login to archive notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  const updateArchiveNote = async (_id) => {
    if (encodedToken) {
      try {
        const res = await axios.post(
          `/api/archives/${_id}`,
          { note: editState.editNotes },
          { headers: { authorization: encodedToken } }
        );
        setNotes(res.data.notes);
        editDispatch({ type: "UPDATED_NOTE" });
        archiveDispatch({ type: "ARCHIVE_DATA", payload: res.data.archives });
        localStorage.setItem("userData", JSON.stringify(res.data));
        toastContainer("Note updated successfully", "success");
      } catch (e) {
        console.log("Note update error", e);
      }
    } else {
      toastContainer("Login to update notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  const restoreFromArchive = async (_id) => {
    const noteToRestore = notes.find((note) => note._id === _id);
    if (encodedToken) {
      try {
        const res = await axios.post(
          `/api/archives/restore/${_id}`,
          { note: noteToRestore },
          { headers: { authorization: encodedToken } }
        );
        setNotes(res.data.notes);
        archiveDispatch({ type: "ARCHIVE_DATA", payload: res.data.archives });
        localStorage.setItem("userData", JSON.stringify(res.data));
        toastContainer("Note restored successfully", "success");
      } catch (e) {
        console.log("Note restore error", e);
      }
    } else {
      toastContainer("Login to restore notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  const deleteFromArchive = async (_id) => {
    if (encodedToken) {
      try {
        const res = await axios.delete(`/api/archives/delete/${_id}`, {
          headers: { authorization: encodedToken },
        });
        setNotes([]);
        archiveDispatch({ type: "ARCHIVE_DATA", payload: res.data.archives });
        localStorage.setItem("userData", JSON.stringify(res.data));
        toastContainer("Note deleted successfully", "warning");
      } catch (e) {
        console.log("Note delete error", e);
      }
    } else {
      toastContainer("Login to delete notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  function ArchiveReducerFn(archiveState, action) {
    switch (action.type) {
      case "ARCHIVE_DATA":
        return { ...archiveState, archiveData: action.payload };
      default:
        return { ...archiveState };
    }
  }
  const [archiveState, archiveDispatch] = useReducer(
    ArchiveReducerFn,
    archiveInitialState
  );

  return (
    <ArchiveContext.Provider
      value={{
        archiveState,
        archiveDispatch,
        addToArchive,
        restoreFromArchive,
        deleteFromArchive,
        updateArchiveNote,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}
export { ArchiveProvider, useArchive };
