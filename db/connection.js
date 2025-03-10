const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "dev";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const db = new Pool({
  user: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

module.exports = db;