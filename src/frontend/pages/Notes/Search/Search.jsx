import React, { useState } from "react";
import { useFilter } from "../../../contexts/filters-context";
import { Filters } from "../Filters/Filters";
import "./search.css";

export const Search = () => {
  const [showFilter, setShowFilter] = useState(false);
  const {
    filterState: { searchText },
    filterDispatch,
  } = useFilter();

  return (
    <div className="relative">
      <div className="search-input mx-auto flex gap space-between p-1">
        <span className="material-icons span icon search-icon">search</span>
        <input
          type="search"
          name="search"
          id="search"
          className="search"
          autoComplete="off"
          placeholder="Search"
          value={searchText}
          onChange={(e) =>
            filterDispatch({ type: "SEARCH_TEXT", payload: e.target.value })
          }
        />
        <span
          className="material-icons span icon search-icon"
          onClick={() => setShowFilter(!showFilter)}
        >
          filter_list
        </span>
      </div>
      {showFilter && <Filters setShowFilter={setShowFilter} />}
    </div>
  );
};
