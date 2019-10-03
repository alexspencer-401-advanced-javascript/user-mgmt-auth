const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const ensureAuth = require('./middleware/ensure-auth');
const checkConnection = require('./middleware/check-connection');
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(checkConnection());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const me = require('./routes/me');
const movies = require('./routes/movies');
app.use('/api/auth', auth);
app.use('/api/me', ensureAuth(), me);
app.use('/api/movies', ensureAuth(), movies);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;