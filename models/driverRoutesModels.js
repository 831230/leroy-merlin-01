const database = require('../database/database');

const createRoute = (user_id,start,end,data,departure_time_zone1,departure_time_zone2,departure_time_zone3,places_in_car,remaning_space_in_car,price_zone1,price_zone2,price_zone3,places_on_route,contact_to_driver,driver_comment, callback) => {
    const sql = `INSERT INTO driver_routes (user_id,start,end,data,departure_time_zone1,departure_time_zone2,departure_time_zone3,places_in_car,remaning_space_in_car,price_zone1,price_zone2,price_zone3,places_on_route,contact_to_driver,driver_comment) VALUES ('${user_id}', '${start}', '${end}', '${data}', '${departure_time_zone1}', '${departure_time_zone2}', '${departure_time_zone3}', '${places_in_car}', '${remaning_space_in_car}', '${price_zone1}', '${price_zone2}', '${price_zone3}', '${places_on_route}', '${contact_to_driver}', '${driver_comment}')`;
    database.appDatabase.run(sql, [], (error, row) => {
      if (error) {
        console.log(error.message)
        callback(error.message);
      }
      const successMessage = "The route was entered successfully."
      callback(successMessage);
    });
  }; 

  // Export models
module.exports = {
    createRoute
  };