// Dependencies.
const mongoose = require('mongoose'); // Database driver.
const rfr = require('rfr'); // Root-relative paths.

// Configuration files.
const DB_CONFIG = rfr('/server/config/dbConfig'); // Database config.
const MSG = rfr('/server/messages/index');  // Response error/success messages.

// Database models.
const Going = rfr('/server/models/Going');  // User is going model.

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
const going = (req, res, next) => {
  // Get the business ID from the request body, and the username.
  const businessID = req.body.business_id;
  const username = req.decoded.username;

  // If no business ID was provided, return an error in the response.
  if (!businessID) { return next(MSG.ERROR.GOING.MISSING_BUSINESS_ID); }

  // Search query.
  const query = {
    username: { $regex: new RegExp(username, 'i') }, // Case-insensitive username.
    business_id: businessID,  // Business ID.
  };

  // Search the database and check if the user is going to that business.
  Going.findOne(query, (errFind, resultFind) => {
    // Database error check.
    if (errFind) { return next(MSG.ERROR.DB.DB_ERROR); }

    /*
     *  Case I:
     *  User is already going, now they no longer want to go.
     *  Delete the document from the database.
     */
    if (resultFind) {
      Going.remove(query, (errRemove) => {
        // Database error check.
        if (errRemove) { return next(MSG.ERROR.DB.DB_ERROR); }

        // Payload to send in response.
        const payload = {
          username,   // Username.
          businessID, // Business ID.
        };

        // Send success response with payload.
        return res.send(Object.assign({}, MSG.SUCCESS.GOING.USER_NOT_GOING, { payload }));
      });
    }

     /*
      *  Case II:
      *  User hasn't indicated they are going, now they want to indicate that.
      *  Insert the document into the database.
      */
    if (!resultFind) {
      // New document to insert.
      const newGoing = Going({
        username,                 // Username.
        business_id: businessID,  // Business ID.
      });

      // Save the document into the database.
      newGoing.save((errSave) => {
        // Database error check.
        if (errSave) { return next(MSG.ERROR.DB.DB_ERROR); }

        // Payload to send in response.
        const payload = {
          username,   // Username.
          businessID, // Business ID.
        };

        // Send success response with payload.
        return res.send(Object.assign({}, MSG.SUCCESS.GOING.USER_GOING, { payload }));
      });
    }

    // Keep linter happy.
    return true;
  });

  // Keep linter happy.
  return true;
};

// Export route.
module.exports = going;
