import React from "react";
import { ToastContainer } from "react-toastify";
import { useTrash, useEdit } from "../../../contexts/hooks-export";

export const Trash = () => {
  const {
    trashState: { trashData },
    deleteFromTrash,
  } = useTrash();
  const {
    editState: { isEdit },
  } = useEdit();

  return (
    <div>
      <h1 className="flex">Trash</h1>
      <div className="flex gap">
        {trashData.length === 0 && <h2 className="pt-1">No notes in trash</h2>}
        {trashData &&
          trashData.map(({ _id, color, title, body, label, date, pinned }) => {
            return (
              <div
                key={_id}
                className="note small-note mt-2 p-1 text-color"
                style={{
                  backgroundColor: color,
                }}
              >
                <div className="flex space-between">
                  <input
                    type="text"
                    placeholder="Title"
                    className="note-title text-capitalize"
                    required
                    value={title}
                    disabled="disabled"
                  />
                  <span
                    className={`${
                      pinned ? "material-icons" : "material-icons-outlined"
                    } span icon`}
                  >
                    push_pin
                  </span>
                </div>
                <textarea
                  name="note-body"
                  id="note-body"
                  cols="30"
                  rows="5"
                  placeholder="Body of note"
                  className="note-body p-0"
                  required
                  value={body}
                  disabled="disabled"
                ></textarea>
                <p className={`label mb-1 ${isEdit ? "hide" : ""}`}>
                  <abbr title="Label" className="flex label-abbr">
                    <span className="material-icons-outlined">
                      label_important
                    </span>
                    <h3>{label}</h3>
                  </abbr>
                </p>
                <div className="flex space-between mt-1">
                  <small>Created : {date}</small>
                  <button
                    className="btn note-btn"
                    onClick={() => deleteFromTrash(_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};
