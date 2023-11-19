const { ClickHouse } = require("clickhouse");

const db = new ClickHouse({
  url: "https://ymw6b9rasa.asia-southeast1.gcp.clickhouse.cloud:8443",
  user: "default",
  password: "SBMDvDW_Gjb6_",
  format: "json",
});

module.exports = {
  db,
};
