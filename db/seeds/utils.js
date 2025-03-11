const db = require("../../db/connection");

function createRefObject(array, key1, key2) {
  const referenceObject = {};
  array.forEach((object) => {
    referenceObject[object[key1]] = object[key2];
  });
  return referenceObject;
}

const convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

module.exports = { createRefObject, convertTimestampToDate };
