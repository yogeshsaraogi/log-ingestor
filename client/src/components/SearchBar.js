import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults, selectedFilter, pageNumber }) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    setInput("");
  }, [selectedFilter]);
  const fetchData = (value) => {
    const url = `/logs?selectedFilter=${selectedFilter}&input=${value}&page=${pageNumber}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  };
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        className="search-input"
        placeholder="Type to search.."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
