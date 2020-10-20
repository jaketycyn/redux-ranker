require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString  = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.envPGDATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.PGDATABASE
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
