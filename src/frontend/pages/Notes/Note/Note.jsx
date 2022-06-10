import { ToastContainer } from "react-toastify";
import { useState } from "react";
import {
  useArchive,
  useEdit,
  useFilter,
  useTrash,
  useNote,
} from "../../../contexts/hooks-export";
import "./note.css";
import { toastContainer } from "../../../Toast/toast";
import { Search } from "../Search/Search";

export const Note = () => {
  const [showNote, setShowNote] = useState(false);
  const {
    noteState: { title, body, color, pinned, label },
    noteDispatch,
    addNote,
    notes,
  } = useNote();
  const { filteredData } = useFilter();
  const {
    editState: { editId, editNotes, isEdit },
    editDispatch,
    updateNote,
  } = useEdit();
  const { addToArchive } = useArchive();
  const { moveToTrash } = useTrash();

  const addedNotes = filteredData.reduce(
    (noteTypes, note) =>
      note.pinned
        ? { ...noteTypes, pinned: [...noteTypes.pinned, note] }
        : { ...noteTypes, others: [...noteTypes.others, note] },
    { pinned: [], others: [] }
  );
  const noteTypes = Object.keys(addedNotes);

  return (
    <div>
      <Search />
      <div
        className={`flex mt-2 note create-note mx-auto relative ${
          showNote ? "hide" : ""
        }`}
      >
        <input
          type="text"
          name="note"
          id="note"
          className="input p-1"
          placeholder="Create a note"
          onFocus={() => setShowNote(true)}
        />
        <span
          className="material-icons-outlined add-note-icon"
          onClick={() => setShowNote(true)}
        >
          add_circle
        </span>
      </div>
      {showNote && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim() && body.trim() && label.trim()) {
              addNote();
              setShowNote(false);
            } else {
              noteDispatch({ type: "CLEAR_FORM" });
              toastContainer("Fields cannot be empty", "error");
            }
          }}
          className="note mx-auto mt-2 p-1 text-color"
          style={{ backgroundColor: "#FFF" }}
        >
          <div className="flex space-between">
            <input
              type="text"
              placeholder="Title"
              className="note-title pl-1"
              required
              value={title}
              onChange={(e) =>
                noteDispatch({
                  type: "ADD_TITLE",
                  payload: e.target.value,
                })
              }
            />
            <div>
              <span
                className={`${
                  pinned ? "material-icons" : "material-icons-outlined"
                } span icon`}
                onClick={() => noteDispatch({ type: "PINNED" })}
              >
                push_pin
              </span>
              <span
                className="material-icons-outlined span icon"
                onClick={() => setShowNote(false)}
              >
                close
              </span>
            </div>
          </div>
          <textarea
            name="note-body"
            id="note-body"
            cols="30"
            rows="5"
            placeholder="Body of note"
            className="note-body"
            required
            value={body}
            onChange={(e) =>
              noteDispatch({
                type: "ADD_BODY",
                payload: e.target.value,
              })
            }
          ></textarea>
          <input
            type="text"
            placeholder="Label"
            className="note-label pl-1"
            required
            value={label}
            onChange={(e) =>
              noteDispatch({
                type: "ADD_LABEL",
                payload: e.target.value,
              })
            }
          />
          <div className="flex flex-end mt-1">
            <div className="flex gap">
              <label htmlFor="color" className="relative">
                <input
                  className="color-input"
                  type="color"
                  name="color"
                  id="color"
                  value={color}
                  onChange={(e) =>
                    noteDispatch({
                      type: "ADD_COLOR",
                      payload: e.target.value,
                    })
                  }
                />
                <span className="material-icons-outlined palette-icon">
                  palette
                </span>
              </label>
              <button className="btn note-btn">Add Note</button>
            </div>
          </div>
        </form>
      )}

      {noteTypes.map((type, index) => {
        return (
          <div key={index}>
            <h1 className="flex pt-1 text-capitalize">
              {addedNotes[type].length > 0 && type}
            </h1>
            <div className="flex gap">
              {addedNotes[type].map(
                ({ _id, color, title, body, label, date, pinned }) => {
                  return (
                    <div
                      key={_id}
                      className="note small-note mt-1 p-1 text-color"
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
