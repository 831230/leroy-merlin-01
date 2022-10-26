function home_get(request, response) {
  if (request.session.loggedIn) {
    console.log(request.session);
    response.render("home");
  }
  response.render("home");
  // response.redirect('/');
}
module.exports = {
  home_get,
};
