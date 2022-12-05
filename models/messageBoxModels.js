const database = require("../database/database");

// const saveNotice = (route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, callback) => {
//   const sql = `INSERT INTO message_box (route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date) VALUES ('${route_id}', '${user_id}', '${deleted_route_start}', '${deleted_route_end}', '${deleted_route_date}') AND notice_status='Y'`;
//   database.appDatabase.get(sql, [], (error, row) => {
//     if (error) {
//       callback(error.message);
//     }
//     callback(row);
//   });
// };

const routeData = (route_id, callback) => {
  console.log("get route data by routeData methode");
  const sql = `SELECT * FROM driver_routes WHERE route_id = ${route_id}`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

const saveNotice = (route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, callback) => {
  console.log("saveNotice methode start");
  const sql = `INSERT INTO message_box (route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, notice_status) VALUES ('${route_id}', '${user_id}', '${deleted_route_start}', '${deleted_route_end}', '${deleted_route_date}', 'Y')`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

module.exports = {
  routeData,
  saveNotice
}