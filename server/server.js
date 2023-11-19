const express = require("express");
const bodyParser = require("body-parser");
const {
  insertLogEntry,
  fetchAllLogData,
  fetchFilteredLogData,
} = require("./helper.js");
const { db } = require("./database");
const app = express();
const port = 3000;

const tableName = "log_data";
const ITEMS_PER_PAGE = 10;
app.use(bodyParser.json());

app.post("/ingest", (req, res) => {
  const logData = req.body;
  if (Array.isArray(logData)) {
    let successfulInsertions = 0;

    logData.forEach((logEntry) => {
      insertLogEntry(logEntry, tableName, db, (insertionError) => {
        if (insertionError) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
    });
    res
      .status(200)
      .json({ successfulInsertions, totalEntries: logData.length });
  } else {
    insertLogEntry(logData, tableName, db, (insertionError) => {
      if (insertionError) {
        console.log("insertionError");

        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.sendStatus(200);
      }
    });
  }
});

app.get("/logs", (req, res) => {
  const { selectedFilter, input, page } = req.query;
  const pageSize = ITEMS_PER_PAGE;
  const offset = (page - 1) * pageSize;

  if (input && selectedFilter) {
    fetchFilteredLogData(
      db,
      tableName,
      selectedFilter,
      input,
      offset,
      pageSize,
      (err, response, totalRecords) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const totalPages = Math.ceil(totalRecords / pageSize);
          res.json({ data: response, totalPages });
        }
      }
    );
  } else {
    fetchAllLogData(
      db,
      tableName,
      offset,
      pageSize,
      (err, response, totalRecords) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const totalPages = Math.ceil(totalRecords / pageSize);
          res.json({ data: response, totalPages });
        }
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
