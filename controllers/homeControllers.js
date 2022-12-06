const messageBoxModels = require("../models/messageBoxModels");
const driverRoutesModel = require("../models/driverRoutesModels");

function home_get(request, response) {
  if (request.session.loggedIn) {
    console.log(request.session);
    response.locals.user = request.session.login;
    messageBoxModels.userIdOfDeletedRoute(request.session.userId, (queryResult) => {
      console.log(queryResult);
      console.log("I am here");
      response.render("home", {
        deletedRoutes: queryResult
      });
      // if(queryResult.length>0){
      //   class DeletedRoute {
      //     constructor(routeStart, routeEnd, routeDate){
      //       this.routeStart = routeStart;
      //       this.routeEnd = routeEnd; 
      //       this.routeDate = routeDate;
      //     }
      //   };
      //   let notificationArr = [];
      //   queryResult.map(el=>{
      //     console.log("Inside map methode:",el.route_id);
      //     driverRoutesModel.getRoute(el.route_id, (queryResultII) => {
      //       console.log(queryResultII);
      //       const deletedRouteObj = new DeletedRoute(queryResultII.start, queryResultII.end, queryResultII.data);
      //       notificationArr.push(deletedRouteObj);
      //       console.log(notificationArr);
      //       response.render("home", {
      //         deletedRoute: queryResult,
      //         deletedRouteII: notificationArr
      //       });
      //     })
          
      //   })
       
      // }
    });
    // if(request.session.userId){}
    
  } else {
    response.redirect("/");
  }
}

function notice_get(request, response) {
  const route_id = request.params.id;
  const user_id = request.session.userId;

  messageBoxModels.userIdOfDeletedRoute(user_id, (queryResult) => {
    console.log(queryResult);
    console.log("I am here");
    if (request.session.loggedIn) {
      // messageBoxModels.saveNotice(route_id, user_id, deleted_route_start, deleted_route_end, deleted_route_date, () => {
      //   console.log("Add data to message_box table");
      // });
      // driverRoutesModel.deleteRoute(route_id, () => {
      //   console.log("Delete Route successfull!!!");
      //   response.redirect("/home");
      // });
      
    } else {
      response.redirect("/");
    }
  })
}

module.exports = {
  home_get,
  notice_get
};
