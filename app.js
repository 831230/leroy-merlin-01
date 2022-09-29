// Load modules
const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');

// Create express application
const app = express();

// Listen on port 8080 for connections
app.listen(5555, () => {
  console.log('Server started and listening at http://localhost:5555');
});

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// // Respond when a GET request is made to the index page
// app.get('/', (request, response) => {
//   response.send('Leroy Merlin start app');
// });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use (express.urlencoded ({extended: true}));

// Application routes
app.use(mainRoutes);

 