const database = require("../database/database");

const createMyRoute = (user_id, route_id, is_active, callback) => {
  const sql = `INSERT INTO my_submited_routes (user_id,route_id,is_active) VALUES ('${user_id}', '${route_id}', '${is_active}')`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      console.log(error.message);
      callback(error.message);
    }
    const successMessage = "Submited my route successfully.";
    callback(successMessage);
  });
};

// Export models
module.exports = {
  createMyRoute,
};
