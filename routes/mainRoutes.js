// Load modules
const express = require('express');
const mainController = require('../controllers/mainControllers');
const homeController = require('../controllers/homeControllers');

//  Create route handler
const router = express.Router();

// Respond when a GET request is made to the index page
router.get('/', (request, response) => {
  response.render('index');
});

// GET main page
router.get('/', mainController.main_index);
router.get('/home',homeController.home_get)

//Login page 
router.post('/login',mainController.login_post)
router.post('/register',mainController.register_post)

router.post('/home',mainController.login_post)
router.post('/newRoute',mainController.driverRoutes_post)

// Export router
module.exports = router;