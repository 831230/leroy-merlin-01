const database = require("../database/database");

const createRoute = (
  user_id,
  start,
  end,
  data,
  departure_time_zone1,
  departure_time_zone2,
  departure_time_zone3,
  places_in_car,
  remaning_space_in_car,
  price_zone1,
  price_zone2,
  price_zone3,
  places_on_route,
  contact_to_driver,
  driver_comment,
  callback
) => {
  const sql = `INSERT INTO driver_routes (user_id,start,end,data,departure_time_zone1,departure_time_zone2,departure_time_zone3,places_in_car,remaning_space_in_car,price_zone1,price_zone2,price_zone3,places_on_route,contact_to_driver,driver_comment,insert_date) VALUES ('${user_id}', '${start}', '${end}', '${data}', '${departure_time_zone1}', '${departure_time_zone2}', '${departure_time_zone3}', '${places_in_car}', '${remaning_space_in_car}', '${price_zone1}', '${price_zone2}', '${price_zone3}', '${places_on_route}', '${contact_to_driver}', '${driver_comment}','${Date.now()}')`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      console.log(error.message);
      callback(error.message);
    }
    const successMessage = "The route was entered successfully.";
    callback(successMessage);
  });
};

const getRoutes = (user_id,callback) => {
  const sql = `SELECT * FROM driver_routes WHERE remaning_space_in_car>0 AND route_id not in (SELECT route_id FROM my_submited_routes WHERE user_id = ${user_id})`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

const getMyRoutes = (user_id, callback) => {
  const sql = `SELECT * FROM driver_routes WHERE user_id = ${user_id} ORDER BY insert_date DESC`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

const getMyRide = (user_id, callback) => {
  const sql = `SELECT * FROM driver_routes WHERE remaning_space_in_car>0 AND route_id in (SELECT route_id FROM my_submited_routes WHERE user_id = ${user_id})`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

// Get route
const getRoute = (id, callback) => {
  const sql = `SELECT * FROM driver_routes WHERE route_id = ${id}`;
  database.appDatabase.get(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    callback(row);
  });
};

const takePlaceInCar = (route_id, callback) => {
  let sql = `UPDATE driver_routes SET remaning_space_in_car = remaning_space_in_car-1 WHERE (route_id = ${route_id})`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = "Take place successfully .";
    callback(successMessage);
  });
};

// Export models
module.exports = {
  createRoute,
  getRoutes,
  getRoute,
  takePlaceInCar,
  getMyRoutes,
  getMyRide
};
