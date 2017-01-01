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
const getRSVP = (req, res, next) => {

  // Get username and business id.
  const username = req.body.username;
  const businessID = req.body.business_id;

  // Error check: username and business ID are required.
  if (!username) { return next(MSG.ERROR.GOING.MISSING_USERNAME); }
  if (!businessID) { return next(MSG.ERROR.GOING.MISSING_BUSINESS_ID); }

  // Query to search the database.
  const query = {
    username: { $regex: new RegExp(username, 'i') }, // Case-insensitive username.
    business_id: businessID,  // Business ID.
  };

  // Find the user and business in the database.
  Going.findOne(query, (errFind, resultFind) => {
    // Database error check.
    if (errFind) { return next(MSG.ERROR.DB.DB_ERROR); }

    // If the user and business was found, then they have RSVP'd.
    const isRSVP = (resultFind) ? true : false;

    // Payload.
    const payload = {
      isRSVP,
      username,
      business_id: businessID,
     };

    // Send response.
    return res.json(Object.assign({}, MSG.SUCCESS.GOING.CHECK_RSVP, { payload }));



  });


  // Keep linter happy.
  return true;
};

// Export route.
module.exports = getRSVP;
