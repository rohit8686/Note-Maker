import React from "react";
import { useFilter } from "../../../contexts/filters-context";
import { useNote } from "../../../contexts/note-context";
import "./filters.css";

export const Filters = ({ setShowFilter }) => {
  const { notes } = useNote();
  const {
    filterState: { labels, sortBy },
    filterDispatch,
  } = useFilter();

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
      <div className="flex space-between">
        <h3 htmlFor="sortby">Sort by :</h3>
        <span
          className="material-icons-outlined icon"
          onClick={() => setShowFilter(false)}
        >
          close
        </span>
      </div>
      <select
        name="sort"
        id="sort"
        className="flex full-width mt-1"
        onChange={(e) =>
          filterDispatch({ type: "SORT_BY", payload: e.target.value })
        }
      >
        <option
          value="oldest-first"
          selected={`${sortBy === "oldest-first" ? "selected" : ""}`}
        >
          Oldest first
        </option>
        <option
          value="newest-first"
          selected={`${sortBy === "newest-first" ? "selected" : ""}`}
        >
          Newest first
        </option>
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
              checked={labels.some((filterLabel) => filterLabel === label)}
            />
            <label htmlFor={label}>{label}</label>
          </div>
        );
      })}
      <p
        className="mt-2 clear-filter pointer"
        onClick={() => filterDispatch({ type: "CLEAR_FILTER" })}
      >
        Clear filters
      </p>
    </div>
  );
};
