// Dependencies.
const mongoose = require('mongoose'); // Database driver.
const rfr = require('rfr'); // Root-relative paths.

// Configuration files.
const DB_CONFIG = rfr('/server/config/dbConfig'); // Database config.
const MSG = rfr('/server/messages/index');// Response error/success messages.

// Database models.
const Going = rfr('/server/models/Going');  // Going database model

/*
 *
 *
 *  Database connection.
 *
 *
 */
// Use mongoose promises.
mongoose.Promise = global.Promise;

// Connect to database.
mongoose.createConnection(DB_CONFIG.CONN_STRING);

/*
 *
 *
 *  Route definition.
 *
 *
 */
const rsvpCount = (req, res, next) => {
  // Get business ID from URL.
  const businessID = req.params.business_id;

  // Query to search the database.
  const query = { business_id: businessID };

  // Count the number of RSVPs for a given business ID.
  Going.count(query, (err, result) => {
    // Database error check.
    if (err) { return next(MSG.ERROR.DB.DB_ERROR); }

    // Payload to be sent with response.
    const payload = {
      businessID,     // Business ID.
      count: result,  // Number of users going to that business.
    };

    // Send response and payload.
    return res.send(Object.assign({}, MSG.SUCCESS.GOING.USERS_TALLIED, { payload }));
  });

  // Keep linter happy.
  return true;
};

// Export route.
module.exports = rsvpCount;
