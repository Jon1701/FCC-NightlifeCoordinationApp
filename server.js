// Dependencies.
const bodyParser = require('body-parser'); // Parse parameters from request body.
const express = require('express'); // ExpressJS.
const morgan = require('morgan');   // Log requests to console.
const path = require('path');       // Path module.
const rfr = require('rfr');         // Root relative paths.

// Express JS instance.
const app = express();

// Log requests to console.
app.use(morgan('dev'));

// Use middleware which parses urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: false }));

// use middleware which parses JSON.
app.use(bodyParser.json());

// API router: Routes defined under this router are prefixed by /api
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

/*
 *
 *
 *  Unprotected routes.
 *  Base endpoint: /api
 *
 *
 */

// Test route.
apiRoutes.get('/test', rfr('server/routes/test'));

/*
 *
 *
 *  Server-side rendering, and error routes.
 *
 *
 */

// Serve static files under the /dist folder.
app.use(express.static('dist'));

// Route to capture client-side routes and use the statically served files.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Error handling route.
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err);
});

/*
 *
 *
 *  Server
 *
 *
 */

// Get next available port, or use 8080 if available.
const port = process.env.PORT || 8080;

//
app.listen(port, () => {
  console.log(`Listening for connections on PORT ${port}`);
});
