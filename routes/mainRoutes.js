// Load modules
const express = require('express');
const mainController = require('../controllers/mainControllers');
const homeController = require('../controllers/homeControllers');
const routeController = require('../controllers/routeControllers');

//  Create route handler
const router = express.Router();

// Respond when a GET request is made to the index page
// router.get('/', (request, response) => {
//     response.render('index');
// });

// GET main page
router.get('/', mainController.main_index);
router.get('/home', homeController.home_get);

//Login page 
router.post('/login', mainController.login_post);
router.post('/register', mainController.register_post);
router.get('/logout', mainController.logout_get)

router.post('/home', mainController.login_post);
router.post('/newRoute', mainController.driverRoutes_post);
router.get('/routes', routeController.routes_get);
router.get('/routes/join/:id', routeController.join_route_get);
router.get('/my_routes', routeController.my_routes_get);
router.get('/my_ride', routeController.my_ride_get);
// Export router
module.exports = router;
