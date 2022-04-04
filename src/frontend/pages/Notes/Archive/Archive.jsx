import { ToastContainer } from "react-toastify";
import { useArchive } from "../../../contexts/archive-context";
import { useEdit } from "../../../contexts/edit-context";

export const Archive = () => {
  const {
    editState: { editId, editNotes, isEdit },
    editDispatch,
  } = useEdit();
  const {
    archiveState: { archiveData },
    updateArchiveNote,
    deleteFromArchive,
    restoreFromArchive,
  } = useArchive();

  return (
    <div>
      <h1 className="flex pt-1">Archived</h1>
      {archiveData.length === 0 && (
        <h2 className="flex pt-1">No archived notes</h2>
      )}
      {archiveData.length > 0 && (
        <div className="flex gap">
          {archiveData.map(
            ({ _id, body, date, label, color, pinned, title }) => {
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
                      value={isEdit && _id === editId ? editNotes.title : title}
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
                        (isEdit && _id === editId ? editNotes.pinned : pinned)
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
                  <p className="label ">{label}</p>
                  <div className="flex space-between mt-1">
                    <small>Created : {date}</small>
                    <div className="flex gap">
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
                        onClick={() => restoreFromArchive(_id)}
                      >
                        unarchive
                      </span>
                      <span
                        className="material-icons-outlined icon"
                        onClick={() => deleteFromArchive(_id)}
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
                            payload: { _id, archiveData },
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={`btn note-btn ${
                          isEdit && _id === editId ? "" : "hide"
                        }`}
                        onClick={() => updateArchiveNote(_id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
