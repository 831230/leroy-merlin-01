// Load modules
const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const session = require('express-session');
const uuid = require('uuid');


// Create express application
const app = express();

// Listen on port 8080 for connections
app.listen(5555, () => {
    console.log('Server started and listening at http://localhost:5555');
});

//Set session
app.use(session({
    secret: '9464f72069a193f5f47dc7c8a9f679e60832c14ee7f04ecf15b69be4ef1d4f7e'
    , name: uuid.v4()
    , resave: false
    ,saveUninitialized: true
}));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// // Respond when a GET request is made to the index page
// app.get('/', (request, response) => {
//   response.send('Leroy Merlin start app');
// });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));




// app.use(session({
//   secret: '9464f72069a193f5f47dc7c8a9f679e60832c14ee7f04ecf15b69be4ef1d4f7e',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 30000 }
// }))

// Application routes
app.use(mainRoutes);

