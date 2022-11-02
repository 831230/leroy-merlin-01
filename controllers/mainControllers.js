// Load modules
const authorizedUsersModel = require("../models/authorizedUsersModels");
const registeredUsersModel = require("../models/registeredUsersModels");
const driverRoutesModel = require("../models/driverRoutesModels");

// Main controller
function main_index(request, response) {
  authorizedUsersModel.getTasks((queryResult) => {
    console.log(queryResult);
    response.render("index", {
      authorized_users: queryResult,
      registered_users: queryResult,
    });
  });
}

function login_post(request, response) {
  const login = request.body.login;
  const password = request.body.password;

  registeredUsersModel.verifyUser(login, password, (result) => {
    if (result.length > 0) {
      request.session.login = login;
      request.session.loggedIn = true;
      request.session.userId = result[0].user_id;
      response.redirect("/home");
    } else {
      console.log("Brak");
      response.redirect("/");
    }
  });
}

function register_post(request, response) {
  const name = request.body.name,
    surname = request.body.surname,
    login = request.body.login,
    password = request.body.password;
  authorizedUsersModel.verifyUser(
    name.toLowerCase(),
    surname.toLowerCase(),
    (result) => {
      if (result.length > 0) {
        registeredUsersModel.createUser(
          name,
          surname,
          login,
          password,
          (result) => {
            console.log("Registerd user.");
            response.redirect("/");
          }
        );
      } else {
        console.log("Brak");
        response.redirect("/");
      }
    }
  );
}

function driverRoutes_post(request, response) {
  const user_id = request.session.userId,
    start = request.body.start,
    end = request.body.end,
    data = request.body.dataRoute,
    departure_time_zone1 = request.body.departureTimeZone1,
    departure_time_zone2 = request.body.departureTimeZone2,
    departure_time_zone3 = request.body.departureTimeZone3,
    places_in_car = request.body.placesInCar,
    remaning_space_in_car = request.body.placesInCar,
    price_zone1 = request.body.priceZone1,
    price_zone2 = request.body.priceZone2,
    price_zone3 = request.body.priceZone3,
    places_on_route = request.body.placesOnRoute,
    contact_to_driver = request.body.contactToDriver,
    driver_comment = request.body.driverComment;
  driverRoutesModel.createRoute(
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
    (result) => {
      console.log("Route added");
      response.redirect("/home");
    }
  );
}

function logout_get(request, response) {
  console.log(request.session.login);
  request.session.destroy((err) => {});
  console.log("Po usuwaniu: " + request.session);
  response.redirect("/");
}

// Export controllers
module.exports = {
  main_index,
  login_post,
  register_post,
  driverRoutes_post,
  logout_get,
};
