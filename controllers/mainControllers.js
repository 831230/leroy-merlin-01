// Load modules
const authorizedUsersModel = require('../models/authorizedUsersModels');
const registeredUsersModel = require('../models/registeredUsersModels');

// Main controller
function main_index (request, response) {
  authorizedUsersModel.getTasks((queryResult) => {
      console.log(queryResult);
      response.render('index', { authorized_users: queryResult, registered_users:queryResult });
    });
  };

function login_post(request,response) {
const login=request.body.login;
const password=request.body.password;
// console.log(login+' '+password);
// response.redirect('/');

registeredUsersModel.verifyUser(login,password, (result) => {
  
  if(result.length>0){
    
    console.log('Jupiiii user.');
    response.redirect('/home');
    // sessionStorage.setItem('loggedUser',login);
  }else{
    console.log('Brak')
    response.redirect('/');
  }
  });
};

function register_post(request,response){
const name=request.body.name, surname=request.body.surname,login=request.body.login,password=request.body.password;
authorizedUsersModel.verifyUser(name.toLowerCase(),surname.toLowerCase(), (result) => {
  
  if(result.length>0){
    registeredUsersModel.createUser(name,surname,login,password, (result) => {
      console.log('Registerd user.')
      response.redirect('/');
    });
  }else{
    console.log('Brak')
    response.redirect('/');
  }
  });
}

// Export controllers
module.exports = {
    main_index,
    login_post,
    register_post
  };