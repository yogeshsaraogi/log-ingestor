import { SearchBar } from "./components/SearchBar";
import "./App.css";
import { useEffect, useState } from "react";
import FilterOption from "./components/FilterOption";
import DateRangeSelector from "./components/DateRangeSelector";
import DataTable from "./components/DataTable";

function App() {
  const [results, setResults] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("level");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const url = `/logs?selectedFilter=${"level"}&input=${""}&page=${pageNumber}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, [selectedFilter, pageNumber]);
  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };
  return (
    <div className="App">
      <div className="search-bar-container">
        <div className="search-filter">
          <SearchBar
            setResults={setResults}
            selectedFilter={selectedFilter}
            pageNumber={pageNumber}
          />
          <FilterOption
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          {selectedFilter === "timestamp" && (
            <DateRangeSelector onChange={handleDateRangeChange} />
          )}
        </div>
        {results != null ? (
          <DataTable
            data={results?.data}
            totalPages={results?.totalPages}
            setPageNumber={setPageNumber}
            currentPage={pageNumber}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
