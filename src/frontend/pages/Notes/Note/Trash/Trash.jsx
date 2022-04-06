import React from "react";
import { useTrash } from "../../../../contexts/trash-context";

export const Trash = () => {
  const {
    trashState: { trashData },
  } = useTrash();

  return (
    <div>
      <h1 className="flex pt-1">Trash</h1>
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
                <p className="label ">{label}</p>
                <div className="flex space-between mt-1">
                  <small>Created : {date}</small>
                  <button className="btn note-btn">Restore</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
