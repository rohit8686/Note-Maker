import { ToastContainer } from "react-toastify";
import { useArchive } from "../../../contexts/archive-context";
import { useEdit } from "../../../contexts/edit-context";
import { useFilter } from "../../../contexts/filters-context";
import { useNote } from "../../../contexts/note-context";
import { useTrash } from "../../../contexts/trash-context";
import "./note.css";

export const Note = () => {
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNote();
        }}
        className="note mx-auto mt-2 p-1 text-color"
        style={{ backgroundColor: `${color}` }}
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
          <span
            className={`${
              pinned ? "material-icons" : "material-icons-outlined"
            } span icon`}
            onClick={() => noteDispatch({ type: "PINNED" })}
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
            <input
              type="color"
              name="color"
              id="color"
              required
              value={color}
              onChange={(e) =>
                noteDispatch({
                  type: "ADD_COLOR",
                  payload: e.target.value,
                })
              }
            />
            <button className="btn note-btn">Add Note</button>
          </div>
        </div>
        <ToastContainer />
      </form>

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
                          disabled={`${isEdit ? "" : "disabled"}`}
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
                        disabled={`${isEdit ? "" : "disabled"}`}
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
                        disabled={`${isEdit ? "" : "disabled"}`}
                      />
                      <p className={`label mb-1 ${isEdit ? "hide" : ""}`}>{label}</p>

                      <small>Created : {date}</small>

                      <div className="flex flex-end gap mt-1">
                        <input
                          type="color"
                          name="color"
                          id="color"
                          required
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
    </div>
  );
};
