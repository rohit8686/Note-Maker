import React from "react";
import { useFilter } from "../../../contexts/filters-context";
import { useNote } from "../../../contexts/note-context";
import "./filters.css";

export const Filters = () => {
  const { notes } = useNote();
  const { filterDispatch } = useFilter();
  const labelNotes = notes.reduce((labelType, note) => {
    if (labelType[note.label]) {
      return {
        ...labelType,
        [note.label]: [...labelType[note.label], note],
      };
    } else {
      return { ...labelType, [note.label]: [note] };
    }
  }, {});
  const labelTypes = Object.keys(labelNotes);

  return (
    <div className="note filter mx-auto mt-2 p-1 text-color">
      <h3 htmlFor="sortby">Sort by :</h3>
      <select
        name="sort"
        id="sort"
        className="flex full-width mt-1"
        onChange={(e) =>
          filterDispatch({ type: "SORT_BY", payload: e.target.value })
        }
      >
        <option value="oldest-first">Oldest first</option>
        <option value="newest-first">Newest first</option>
      </select>
      <h3 className="pt-1">Labels :</h3>

      {labelTypes.map((label, index) => {
        return (
          <div className="flex gap flex-start pt-1" key={index}>
            <input
              type="checkbox"
              name={label}
              id={label}
              onChange={(e) =>
                filterDispatch({ type: "LABEL", payload: label })
              }
            />
            <label htmlFor={label}>{label}</label>
          </div>
        );
      })}
      <p className="mt-2 clear-filter">Clear filters</p>
    </div>
  );
};
