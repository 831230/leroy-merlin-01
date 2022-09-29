// Load modules
const express = require('express');
const mainController = require('../controllers/mainControllers');

//  Create route handler
const router = express.Router();

// Respond when a GET request is made to the index page
router.get('/', (request, response) => {
  response.render('index');
});

// GET main page
router.get('/', mainController.main_index);

//Login page 
router.post('/login',mainController.login_post)
router.post('/register',mainController.register_post)

// Export router
module.exports = router;