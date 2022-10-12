const driverRoutesModel = require("../models/driverRoutesModels");
const mySubmitedRoutesModel = require("../models/mySubmitedRoutesModels");

function routes_get(request, response) {
  driverRoutesModel.getRoutes((queryResult) => {
    console.log(queryResult);
    response.render("routes", { routes: queryResult });
  });
}

function my_routes_get(request, response) {
    driverRoutesModel.getMyRoutes(4,(queryResult) => {
      console.log(queryResult);
      response.render("my_routes", { my_routes: queryResult });
    });
  }

function join_route_get(request, response) {
  const route_id = request.params.id;
  const user_id = 4;
  mySubmitedRoutesModel.createMyRoute(user_id, route_id, "Y", () => {
    driverRoutesModel.takePlaceInCar(route_id, () => {
      response.redirect("/home");
    });
  });
}

module.exports = {
  routes_get,
  join_route_get,
  my_routes_get
};
