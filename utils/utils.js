const db = require("../db/connection");
const format = require("pg-format");

exports.createRefObject = (array, key1, key2) => {
  const referenceObject = {};
  array.forEach((object) => {
    if (object[key1] !== undefined) {  
      referenceObject[object[key1]] = object[key2];
    }
  });
  return referenceObject;
};
exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};
exports.checkExists = (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column);

  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Resource not found",
      });
    }
    return true
  });
};
