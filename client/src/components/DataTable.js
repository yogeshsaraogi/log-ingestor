import React from "react";
import "./DataTable.css";

const DataTable = ({ data, totalPages, setPageNumber, currentPage }) => {
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Message</th>
            <th>Resource ID</th>
            <th>Timestamp</th>
            <th>Trace ID</th>
            <th>Span ID</th>
            <th>Commit</th>
            <th>Parent Resource ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.level}</td>
              <td>{row.message}</td>
              <td>{row.resourceId}</td>
              <td>{row.timestamp}</td>
              <td>{row.traceId}</td>
              <td>{row.spanId}</td>
              <td>{row.commit}</td>
              <td>{row.parentResourceId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="pagination-button"
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
