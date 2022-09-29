const database = require('../database/database');
const crypto = require('crypto');


const createUser = (name,surname,login,password, callback) => {
    let passwordHash=crypto.createHash('sha256').update(password).digest('base64');
    const sql = `INSERT INTO registered_users (name,surname,login,password) VALUES ('${name}', '${surname}', '${login}', '${passwordHash}')`;
    database.appDatabase.run(sql, [], (error, row) => {
      if (error) {
        callback(error.message);
      }
      const successMessage = "The user was entered successfully."
      callback(successMessage);
    });
  };

  const verifyUser = (login,password, callback) => {
    let passwordHash=crypto.createHash('sha256').update(password).digest('base64');
    const sql = `SELECT * FROM registered_users WHERE login='${login}' AND password='${passwordHash}'`;
    database.appDatabase.all(sql, [], (error, row) => {
      if (error) {
        callback(error.message);
      }
      callback (row);
    });
  };

  // Export models
module.exports = {
    createUser,
    verifyUser
  };