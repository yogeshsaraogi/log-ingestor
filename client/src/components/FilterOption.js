import React from "react";
import "./FilterOption.css";
const FILTERS = [
  "level",
  "message",
  "resourceId",
  "timestamp",
  "traceId",
  "spanId",
  "commit",
  "parentResourceId",
];

function FilterOption({ selectedFilter, setSelectedFilter }) {
  return (
    <div className="log-filter">
      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        {FILTERS.map((val, idx) => {
          return (
            <option value={val} key={idx + 1}>
              {val}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FilterOption;
