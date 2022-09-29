// Load modules
const database = require('../database/database');

// Get all tasks from database
const getTasks = (callback) => {
  const sql = `SELECT * FROM authorized_users`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

const verifyUser = (name,surname, callback) => {
  const sql = `SELECT * FROM authorized_users WHERE name='${name}' AND surname='${surname}'`;
  database.appDatabase.all(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    callback (row);
  });
};


// Export models
module.exports = {
  getTasks,
  verifyUser
};