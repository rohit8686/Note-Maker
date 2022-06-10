import axios from "axios";
import { React, createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../Toast/toast";
import { useAuth } from "./auth-context";
import { useNote } from "./note-context";

const TrashContext = createContext();
const useTrash = () => useContext(TrashContext);

function TrashProvider({ children }) {
  const navigate = useNavigate();
  const { notes, setNotes } = useNote();
  const {
    authState: { encodedToken },
  } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const trashInitialState = {
    trashData: [],
  };

  const moveToTrash = async (_id) => {
    const noteToTrash = notes.find((note) => note._id === _id);
    if (encodedToken) {
      try {
        const res = await axios.delete(`/api/notes/${_id}`, {
          headers: { authorization: encodedToken },
        });
        setNotes(res.data.notes);
        trashDispatch({ type: "ADD_TO_TRASH", payload: noteToTrash });
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, notes: res.data.notes })
        );
        toastContainer("Note moved to trash", "warning");
      } catch (e) {
        console.log("Move to trash error", e);
      }
    } else {
      toastContainer("Login to add notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  const deleteFromTrash = async (_id) => {
    if (encodedToken) {
      const modifiedTrashData = trashState.trashData.filter(
        (item) => item._id !== _id
      );
      trashDispatch({
        type: "REMOVE_FROM_TRASH",
        payload: modifiedTrashData,
      });
      toastContainer("Note deleted permanently", "error");
    } else {
      toastContainer("Login to add notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  function trashReducerFn(trashState, action) {
    switch (action.type) {
      case "ADD_TO_TRASH":
        return {
          ...trashState,
          trashData: [...trashState.trashData, action.payload],
        };
      case "REMOVE_FROM_TRASH":
        return { ...trashState, trashData: action.payload };
      default:
        return { ...trashState };
    }
  }
  const [trashState, trashDispatch] = useReducer(
    trashReducerFn,
    trashInitialState
  );

  return (
    <TrashContext.Provider
      value={{
        trashState,
        trashDispatch,
        moveToTrash,
        deleteFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
}
export { TrashProvider, useTrash };
