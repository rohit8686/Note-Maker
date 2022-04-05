import { React, createContext, useContext, useReducer } from "react";
import { useNote } from "./note-context";

const FilterContext = createContext();
const useFilter = () => useContext(FilterContext);

function FilterProvider({ children }) {
  const filterInitialState = {
    sortBy: "oldest-first",
    labels: [],
    searchText: "",
  };
  const [filterState, filterDispatch] = useReducer(
    filterReducerFn,
    filterInitialState
  );
  const { notes } = useNote();

  const getSortData = (notes, sortBy) => {
    if (sortBy === "oldest-first") {
      const oldestFirstData = [...notes].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      return oldestFirstData;
    } else if (sortBy === "newest-first") {
      const newestFirstData = [...notes].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return newestFirstData;
    } else {
      return notes;
    }
  };
  const getLabelData = (sortedData, labels) => {
    if (labels.length > 0) {
      const labelsData = sortedData.filter((note) =>
        labels.includes(note.label)
      );
      return labelsData;
    }
    return sortedData;
  };
  const getSearchData = (labelData, searchText) => {
    if (searchText) {
      const searchData = labelData.filter((note) => {
        const { title, label } = note;
        const searchCondition =
          title.includes(searchText) || label.includes(searchText);
        return searchCondition;
      });
      return searchData;
    } else {
      return labelData;
    }
  };

  function getFilteredData(notes, filterState) {
    const { sortBy, labels, searchText } = filterState;
    const sortedData = getSortData(notes, sortBy);
    const labelData = getLabelData(sortedData, labels);
    const searchData = getSearchData(labelData, searchText);
    return searchData;
  }
  const filteredData = getFilteredData(notes, filterState);

  function filterReducerFn(filterState, action) {
    switch (action.type) {
      case "LABEL":
        if (filterState.labels.includes(action.payload)) {
          const modifiedLabelsData = filterState.labels.filter(
            (label) => label !== action.payload
          );
          return { ...filterState, labels: modifiedLabelsData };
        }
        return {
          ...filterState,
          labels: [...filterState.labels, action.payload],
        };
      case "SORT_BY":
        return { ...filterState, sortBy: action.payload };
      case "SEARCH_TEXT":
        return { ...filterState, searchText: action.payload };
      case "CLEAR_FILTER":
        return { ...filterInitialState };
      default:
        return { ...filterState };
    }
  }

  return (
    <FilterContext.Provider
      value={{
        filterState,
        filterDispatch,
        getSortData,
        filteredData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
export { FilterProvider, useFilter };
