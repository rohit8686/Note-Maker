import React from "react";
import "./search.css";

export const Search = () => {
  return (
    <div className="search-input mx-auto flex gap space-between p-1">
      <span className="material-icons span icon search-icon">search</span>
      <input
        type="search"
        name="search"
        id="search"
        className="search"
        autoComplete="off"
        placeholder="Search"
      />
      <span className="material-icons span icon search-icon">filter_list</span>
    </div>
  );
};
