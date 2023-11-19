import React from "react";
import "./SearchResult.css";

export const SearchResult = ({ result, selectedFilter }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You clicked on ${result[selectedFilter]}`)}
    >
      {result[selectedFilter]}
    </div>
  );
};
