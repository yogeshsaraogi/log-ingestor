# Log Management System

This project consists of a server and a client for managing log entries. The server is responsible for ingesting log entries, storing them in a database, and providing APIs to retrieve log data. The client is a web application that allows users to search and filter log entries.

## Server

### Technologies Used

- Node.js
- Express.js
- ClickHouse DB

### Setup

1. Install dependencies: `npm install`
2. Start the server: `npm run dev`

### Endpoints

#### Ingest Log Entry

- **Endpoint:** `/ingest`
- **Method:** POST
- **Body:** JSON array of log entries or a single log entry
- **Example:**
  ```json
  [
    {
      "level": "info",
      "message": "Log entry 1",
      "resourceId": "123",
      "timestamp": "2023-01-01T12:00:00Z",
      "traceId": "abc",
      "spanId": "xyz",
      "commit": "abc123",
      "metadata": {
        "parentResourceId": "456"
      }
    }
    // Additional log entries...
  ]
  ```

#### Retrieve Log Entries

- **Endpoint:** `/logs`
- **Method:** GET
- **Query Parameters:**
  - `selectedFilter`: Filter field (e.g., "level")
  - `input`: Filter value
  - `page`: Page number for pagination
- **Example:**
  - Retrieve all log entries: `/logs`
  - Filter by level: `/logs?selectedFilter=level&input=info`
  - Paginate results: `/logs?page=2`

## Client

### Technologies Used

- React
- HTML
- CSS

### Setup

1. Install dependencies: `npm install`
2. Start the client: `npm start`

### Usage

- Open the client application in a web browser.
- The application allows users to search and filter log entries based on the log level and other keywords.
- If the selected filter is "timestamp," a date range selector is rendered (although it currently has no functionality).

### Note

- Ensure the server is running on port 3000.
- Start the client application separately, as it may run on a different port.

Feel free to customize the project based on your specific requirements and database setup.
