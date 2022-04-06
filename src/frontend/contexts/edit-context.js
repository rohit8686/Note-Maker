import axios from "axios";
import { React, createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toastContainer } from "../toast/toast";
import { useNote, useAuth } from "./hooks-export";

const EditContext = createContext();
const useEdit = () => useContext(EditContext);

function EditProvider({ children }) {
  const navigate = useNavigate();
  const { setNotes } = useNote();
  const {
    authState: { encodedToken },
  } = useAuth();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const editInitialState = {
    editId: "",
    isEdit: false,
    editNotes: {
      title: "",
      body: "",
      color: "",
      label: "",
      pinned: "",
      date: new Date().toLocaleString(),
    },
  };

  const updateNote = async (_id) => {
    if (encodedToken) {
      try {
        const res = await axios.post(
          `/api/notes/${_id}`,
          { note: editState.editNotes },
          { headers: { authorization: encodedToken } }
        );
        setNotes(res.data.notes);
        editDispatch({ type: "UPDATED_NOTE" });
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, notes: res.data.notes })
        );
        toastContainer("Note updated", "info");
      } catch (e) {
        console.log("Note update error", e);
      }
    } else {
      toastContainer("Login to add notes", "error");
      setTimeout(() => navigate("/login"), 4000);
    }
  };

  function editReducerFn(editState, action) {
    switch (action.type) {
      case "ADD_TITLE":
        return {
          ...editState,
          editNotes: { ...editState.editNotes, title: action.payload },
        };
      case "ADD_BODY":
        return {
          ...editState,
          editNotes: { ...editState.editNotes, body: action.payload },
        };
      case "ADD_COLOR":
        return {
          ...editState,
          editNotes: { ...editState.editNotes, color: action.payload },
        };
      case "ADD_LABEL":
        return {
          ...editState,
          editNotes: { ...editState.editNotes, label: action.payload },
        };
      case "PINNED":
        return {
          ...editState,
          editNotes: {
            ...editState.editNotes,
            pinned: !editState.editNotes.pinned,
          },
        };
      case "EDIT_NOTE":
        const { _id, notes, archiveData } = action.payload;
        const editData =
          (notes && notes.find((note) => note._id === _id)) ||
          (archiveData && archiveData.find((note) => note._id === _id));
        return {
          ...editState,
          isEdit: true,
          editId: _id,
          editNotes: { ...editData, date: new Date().toLocaleString() },
        };
      case "UPDATED_NOTE":
        return {
          ...editState,
          isEdit: false,
          editNotes: editInitialState.editNotes,
        };
      default:
        return { ...editState };
    }
  }
  const [editState, editDispatch] = useReducer(editReducerFn, editInitialState);

  return (
    <EditContext.Provider
      value={{
        editState,
        editDispatch,
        updateNote,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}
export { EditProvider, useEdit };
