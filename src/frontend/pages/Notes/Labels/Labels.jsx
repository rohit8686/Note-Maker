import React from "react";
import { ToastContainer } from "react-toastify";
import {
  useArchive,
  useEdit,
  useFilter,
  useNote,
  useTrash,
} from "../../../contexts/hooks-export";
import { Search } from "../Search/Search";

export const Labels = () => {
  const { notes } = useNote();
  const { filteredData } = useFilter();
  const {
    editState: { editId, editNotes, isEdit },
    editDispatch,
    updateNote,
  } = useEdit();
  const { addToArchive } = useArchive();
  const { moveToTrash } = useTrash();

  const labelNotes = filteredData.reduce((labelTypes, note) => {
    if (labelTypes[note.label]) {
      return { ...labelTypes, [note.label]: [...labelTypes[note.label], note] };
    } else {
      return { ...labelTypes, [note.label]: [note] };
    }
  }, {});
  const labelTypes = Object.keys(labelNotes);

  return (
    <div>
      <Search />
      <h1 className="flex pt-1">Labels</h1>
      {notes.length === 0 && <h2 className="flex pt-1">No Notes are added</h2>}
      {labelTypes.map((label, index) => {
        return (
          <div key={index}>
            <h1 className="flex pt-1">{label}</h1>
            <div className="flex gap">
              {labelNotes[label].map(
                ({ _id, color, title, body, label, date, pinned }) => {
                  return (
                    <div
                      key={_id}
                      className="note small-note mt-2 p-1 text-color"
                      style={{
                        backgroundColor: `${
                          isEdit && _id === editId ? editNotes.color : color
                        }`,
                      }}
                    >
                      <div className="flex space-between">
                        <input
                          type="text"
                          placeholder="Title"
                          className="note-title text-capitalize"
                          required
                          value={
                            isEdit && _id === editId ? editNotes.title : title
                          }
                          onChange={(e) =>
                            editDispatch({
                              type: "ADD_TITLE",
                              payload: e.target.value,
                            })
                          }
                          disabled={`${
                            isEdit && _id === editId ? "" : "disabled"
                          }`}
                        />
                        <span
                          className={`${
                            (
                              isEdit && _id === editId
                                ? editNotes.pinned
                                : pinned
                            )
                              ? "material-icons"
                              : "material-icons-outlined"
                          } span icon`}
                          onClick={() =>
                            isEdit ? editDispatch({ type: "PINNED" }) : ""
                          }
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
                        value={isEdit && _id === editId ? editNotes.body : body}
                        onChange={(e) =>
                          editDispatch({
                            type: "ADD_BODY",
                            payload: e.target.value,
                          })
                        }
                        disabled={`${
                          isEdit && _id === editId ? "" : "disabled"
                        }`}
                      ></textarea>
                      <input
                        className={`label-input full-width mb-1 ${
                          isEdit ? "" : "hide"
                        }`}
                        value={
                          isEdit && _id === editId ? editNotes.label : label
                        }
                        onChange={(e) =>
                          editDispatch({
                            type: "ADD_LABEL",
                            payload: e.target.value,
                          })
                        }
                        disabled={`${
                          isEdit && _id === editId ? "" : "disabled"
                        }`}
                      />
                      <p className={`label mb-1 ${isEdit ? "hide" : ""}`}>
                        <abbr title="Label" className="flex label-abbr">
                          <span className="material-icons-outlined">
                            label_important
                          </span>{" "}
                          <h3>{label}</h3>
                        </abbr>
                      </p>

                      <small>Created : {date}</small>
                      <div className="flex flex-end gap mt-1">
                        <label htmlFor="color" className="relative">
                          <input
                            className="color-input"
                            type="color"
                            name="color"
                            id="color"
                            value={
                              isEdit && _id === editId ? editNotes.color : color
                            }
                            onChange={(e) =>
                              isEdit
                                ? editDispatch({
                                    type: "ADD_COLOR",
                                    payload: e.target.value,
                                  })
                                : ""
                            }
                          />
                          <span className="material-icons-outlined palette-icon">
                            palette
                          </span>
                        </label>
                        <span
                          className="material-icons-outlined icon"
                          onClick={() => addToArchive(_id)}
                        >
                          archive
                        </span>
                        <span
                          className="material-icons-outlined icon"
                          onClick={() => moveToTrash(_id)}
                        >
                          delete
                        </span>
                        <button
                          className={`btn note-btn ${
                            isEdit && _id === editId ? "hide" : ""
                          }`}
                          onClick={() =>
                            editDispatch({
                              type: "EDIT_NOTE",
                              payload: { _id, notes },
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className={`btn note-btn ${
                            isEdit && _id === editId ? "" : "hide"
                          }`}
                          onClick={() => updateNote(_id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};
