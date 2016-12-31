// Dependencies.
const bodyParser = require('body-parser'); // Parse parameters from request body.
const express = require('express'); // ExpressJS.
const morgan = require('morgan');   // Log requests to console.
const path = require('path');       // Path module.
const rfr = require('rfr');         // Root relative paths.

// Other modules.
const verifyJWT = rfr('/server/middleware/verifyJWT');  // Verify JWT.

// Express JS instance.
const app = express();

/*
 *
 *
 *  Application Middleware.
 *
 *
 */

// Log requests to console.
app.use(morgan('dev'));

// Use middleware which parses urlencoded bodies.
app.use(bodyParser.urlencoded({ extended: false }));

// use middleware which parses JSON.
app.use(bodyParser.json());

/*
 *
 *
 *  Routers.
 *
 *
 */

// Router: Base endpoint: /api.
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

// Router. Base endpoint: /api/auth.
const authRoutes = express.Router();
app.use('/api/auth', authRoutes);

/*
 *
 *
 *  Unprotected routes.
 *  Base endpoint: /api
 *
 *
 */

// Search route.
apiRoutes.get('/search', rfr('server/routes/search'));

// Signup route.
apiRoutes.post('/signup', rfr('/server/routes/signup'));

// Login route.
apiRoutes.post('/login', rfr('/server/routes/login'));

/*
 *
 *
 *  Protected routes.
 *  Base endpoint: /api/auth
 *
 *
 */

// Middleware: verify JWT for authenticated routes.
authRoutes.use(verifyJWT);

// Going to a business.
authRoutes.post('/going', rfr('/server/routes/auth/going'));

/*
 *
 *
 *  Server-side rendering, and error routes.
 *
 *
 */

 // Error handling route.
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send(err);
 });

// Serve static files under the /dist folder.
app.use(express.static('dist'));

// Route to capture client-side routes and use the statically served files.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
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

// Listen for connections.
app.listen(port, () => {
  console.log(`Listening for connections on PORT ${port}`);
});
