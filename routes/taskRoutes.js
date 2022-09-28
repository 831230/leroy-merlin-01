// Load modules
const express = require('express');
const taskController = require('../controllers/taskControllers');

//  Create route handler
const router = express.Router();

// Respond when a GET request is made to the index page
router.get('/', (request, response) => {
  response.render('index');
});

// GET Index Page
router.get('/', taskController.task_index);

// Export router
module.exports = router;