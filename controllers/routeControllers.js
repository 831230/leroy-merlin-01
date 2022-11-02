const driverRoutesModel = require("../models/driverRoutesModels");
const mySubmitedRoutesModel = require("../models/mySubmitedRoutesModels");

function routes_get(request, response) {
  console.log(request.session.userId);
  if (request.session.loggedIn) {
    driverRoutesModel.getRoutes(request.session.userId, (queryResult) => {
      console.log(queryResult);
      response.render("routes", { routes: queryResult ,userId: request.session.userId});
    });
  } else {
    response.redirect("/");
  }
}

function my_routes_get(request, response) {
  driverRoutesModel.getMyRoutes(request.session.userId, (queryResult) => {
    console.log(queryResult);
    response.render("my_routes", { my_routes: queryResult });
  });
}

function my_ride_get(request, response) {
  driverRoutesModel.getMyRide(request.session.userId, (queryResult) => {
    console.log(queryResult);
    response.render("my_ride", { my_ride: queryResult,user: request.session.login });
  });
}

function join_route_get(request, response) {
  const route_id = request.params.id;
  const user_id = request.session.userId;
  mySubmitedRoutesModel.createMyRoute(user_id, route_id, "Y", () => {
    driverRoutesModel.takePlaceInCar(route_id, () => {
      response.redirect("/home");
    });
  });
}

module.exports = {
  routes_get,
  join_route_get,
  my_routes_get,
  my_ride_get,
};
