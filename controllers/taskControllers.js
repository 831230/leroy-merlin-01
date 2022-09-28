// Load modules
const taskModel = require('../models/taskModels');

// Index page controller
function task_index (request, response) {
    taskModel.getTasks((queryResult) => {
      console.log(queryResult);
      response.render('index', { authorized_users: queryResult, registered_users:queryResult });
    });
  };

// Export controllers
module.exports = {
    task_index
  };