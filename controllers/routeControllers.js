const driverRoutesModel = require("../models/driverRoutesModels");
const mySubmitedRoutesModel = require("../models/mySubmitedRoutesModels");
// ============================================================================
function routes_get(request, response) {
  response.locals.user = request.session.login;
  console.log(request.session.userId);
  if (request.session.loggedIn) {
    driverRoutesModel.getRoutes(request.session.userId, (queryResult) => {
      console.log(queryResult);
      response.render("routes", {
        routes: queryResult,
        userId: request.session.userId,
      });
    });
  } else {
    response.redirect("/");
  }
}

function my_routes_get(request, response) {
  console.log(request.session.userId);
  if (request.session.loggedIn) {
    driverRoutesModel.getMyRoutes(request.session.userId, (queryResult) => {
      console.log(queryResult);
      response.render("my_routes", {
        my_routes: queryResult,
        user: request.session.login,
      });
    });
  } else {
    response.redirect("/");
  }
}
// function my_routes_get(request, response) {
//   driverRoutesModel.getMyRoutes(request.session.userId, (queryResult) => {
//     console.log(queryResult);
//     response.render("my_routes", { my_routes: queryResult });
//   });
// }



function my_ride_get(request, response) {
  if (request.session.loggedIn) {
    driverRoutesModel.getMyRide(request.session.userId, (queryResult) => {
      console.log(queryResult);
      response.render("my_ride", {
        my_ride: queryResult,
        user: request.session.login,
      });
    });
  } else {
    response.redirect("/");
  }
}

function join_route_get(request, response) {
  if (request.session.loggedIn) {
    const route_id = request.params.id;
    const user_id = request.session.userId;
    mySubmitedRoutesModel.createMyRoute(user_id, route_id, "Y", () => {
      driverRoutesModel.takePlaceInCar(route_id, () => {
        response.redirect("/home");
      });
    });
  } else {
    response.redirect("/");
  }
}

function delete_route_get(request, response) {
  const route_id = request.params.id;
  if (request.session.loggedIn) {
    driverRoutesModel.deleteRoute(route_id, () => {
      console.log("Delete Route successfull!!!");
      response.redirect("/home");
    });
  } else {
    response.redirect("/");
  }
}

function delete_my_ride_get(request, response) {
  const route_id = request.params.id;
  const user_id = request.session.userId;
  if (request.session.loggedIn) {
    driverRoutesModel.deleteMyRide(route_id, user_id, () => {
      console.log("Delete My Ride successfull!!!");
      driverRoutesModel.addPlaceInCar(route_id, () => {
        response.redirect("/home");
      });
    });
  } else {
    response.redirect("/");
  }
}

module.exports = {
  routes_get,
  join_route_get,
  my_routes_get,
  my_ride_get,
  delete_route_get,
  delete_my_ride_get
};
