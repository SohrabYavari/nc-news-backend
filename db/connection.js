const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "dev";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const db = new Pool({});

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

module.exports = db;