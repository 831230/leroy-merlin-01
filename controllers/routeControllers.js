const driverRoutesModel = require("../models/driverRoutesModels");
const mySubmitedRoutesModel = require("../models/mySubmitedRoutesModels");
const messageBoxModels = require("../models/messageBoxModels");
// ============================================================================
function routes_get(request, response) {
  response.locals.user = request.session.login;
  const dateNow = new Date();
  let dayOfMonth = String(dateNow.getDate());
  let monthOfYear = String(dateNow.getMonth()+1);
  let year = String(dateNow.getFullYear());
  const dateNowString = `${year}-${monthOfYear.padStart(2, '0')}-${dayOfMonth.padStart(2, '0')}`;
  console.log(dateNowString);
  console.log(request.session.userId);
  if (request.session.loggedIn) {
    driverRoutesModel.getRoutes(dateNowString, request.session.userId, (queryResult) => {
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

function routes_post(request, response) {
  response.locals.user = request.session.login;

  const data_start = request.body.data_start;
  const data_end = new Date(request.body.data_end) ;
  
  let dayOfMonth = String(data_end.getDate()+1);
  let monthOfYear = String(data_end.getMonth()+1);
  let year = String(data_end.getFullYear());
  const data_end_plus = `${year}-${monthOfYear}-${dayOfMonth}`;
  
  console.log(request.session.userId);
  console.log(data_end_plus);
  if (request.session.loggedIn) {
    driverRoutesModel.getRoutesFiltr(data_start, data_end_plus, request.session.userId, (queryResult) => {
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

// ***************************************************************
// function delete_route_get(request, response) {
//   const route_id = request.params.id;
//   if (request.session.loggedIn) {
//     driverRoutesModel.deleteRoute(route_id, () => {
//       console.log("Delete Route successfull!!!");
//       response.redirect("/home");
//     });
//   } else {
//     response.redirect("/");
//   }
// }
// ***************************************************************

function delete_route_get(request, response) {
  const route_id = request.params.id;
  const user_id = request.session.userId;

  messageBoxModels.routeData(route_id, (queryResult) => {
    console.log(queryResult[0].start);
    console.log(queryResult[0].end);
    console.log(queryResult[0].data);
    const deleted_route_start = queryResult[0].start;
    const deleted_route_end = queryResult[0].end;
    const deleted_route_date = queryResult[0].data;
    if (request.session.loggedIn) {
      messageBoxModels.saveNotice(route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, () => {
        console.log("Add data to message_box table");
      });
      // messageBoxModels.saveNoticeStartEndData(route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, () => {
      //   console.log("Add data to my_submited_routes table");
      // });
      messageBoxModels.delationStatus(route_id, deleted_route_start, deleted_route_end, deleted_route_date, () => {
        console.log("Add status -Y- to notification");
      });
      driverRoutesModel.deleteRoute(route_id, () => {
        console.log("Delete Route successfull!!!");
        response.redirect("/home");
      });
      
    } else {
      response.redirect("/");
    }
  })
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

function delete_notice_get(request, response) {
  const route_id = request.params.id;
  const user_id = request.session.userId;
  if (request.session.loggedIn) {
    messageBoxModels.deleteMyNotice(route_id, user_id, () => {
      console.log("Delete My Notice successfull!!!");
      response.redirect("/home");
    });
  } else {
    response.redirect("/");
  }
}

module.exports = {
  routes_get,
  routes_post,
  join_route_get,
  my_routes_get,
  my_ride_get,
  delete_route_get,
  delete_my_ride_get,
  delete_notice_get
};
