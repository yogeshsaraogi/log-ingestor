const insertLogEntry = (logData, tableName, db, callback) => {
  const insertLogDataQuery = `INSERT INTO ${tableName} (
      level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId
    ) VALUES (
      '${logData.level}',
      '${logData.message}',
      '${logData.resourceId}',
      '${logData.timestamp}',
      '${logData.traceId}',
      '${logData.spanId}',
      '${logData.commit}',
      '${logData.metadata?.parentResourceId || ""}'
    )`;

  db.query(insertLogDataQuery).exec((err, response) => {
    if (err) {
      console.error("Error inserting data:", err);
      callback(err);
    } else {
      console.log("Data inserted successfully:", response);
      callback(null);
    }
  });
};

const fetchAllLogData = (db, tableName, offset, limit, callback) => {
  const getLogDataQuery = `SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}`;
  db.query(getLogDataQuery).exec((err, response) => {
    if (err) {
      console.error("Error executing query:", err);
      callback(err, null, 0);
    } else {
      const countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;
      db.query(countQuery).exec((countErr, countResult) => {
        if (countErr) {
          console.error("Error counting total records:", countErr);
          callback(countErr, null, 0);
        } else {
          const totalRecords = countResult[0].total;
          callback(null, response, totalRecords);
        }
      });
    }
  });
};

const fetchFilteredLogData = (
  db,
  tableName,
  selectedFilter,
  input,
  offset,
  limit,
  callback
) => {
  const filterQuery = `SELECT * FROM ${tableName} WHERE ${selectedFilter} LIKE '%${input}%' LIMIT ${limit} OFFSET ${offset}`;
  db.query(filterQuery).exec((err, response) => {
    if (err) {
      console.error("Error executing query:", err);
      callback(err, null, 0);
    } else {
      const countQuery = `SELECT COUNT(*) as total FROM ${tableName} WHERE ${selectedFilter} LIKE '%${input}%'`;
      db.query(countQuery).exec((countErr, countResult) => {
        if (countErr) {
          console.error("Error counting total records:", countErr);
          callback(countErr, null, 0);
        } else {
          const totalRecords = countResult[0].total;
          callback(null, response, totalRecords);
        }
      });
    }
  });
};

module.exports = {
  insertLogEntry,
  fetchAllLogData,
  fetchFilteredLogData,
};
