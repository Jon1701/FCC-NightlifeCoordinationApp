// Dependencies.
const Yelp = require('yelp'); // Yelp API wrapper.
const rfr = require('rfr'); // Root-relative paths.

// Other dependencies.
const APP_CONFIG = rfr('server/config/appConfig');  // Application keys and tokens.
const MSG = rfr('server/messages/index'); // Success/Error responses.

// Route definition.
const search = (req, res, next) => {
  // Extract search term and location from URL query string.
  const term = req.query.term;
  const location = req.query.location;

  // Check if search term is provided.
  if (!term || term.trim().length === 0) {
    return next(MSG.ERROR.YELP.NO_TERM);
  }

  // Check if location is provided.
  if (!location || location.trim().length === 0) {
    return next(MSG.ERROR.YELP.NO_LOCATION);
  }

  // Create a Yelp instance, pass in API keys.
  const yelp = new Yelp({
    consumer_key: APP_CONFIG.YELP_CONSUMER_KEY,
    consumer_secret: APP_CONFIG.YELP_CONSUMER_SECRET,
    token: APP_CONFIG.YELP_TOKEN,
    token_secret: APP_CONFIG.YELP_TOKEN_SECRET,
  });

  // Call the Yelp /search endpoint with the given term and location.
  yelp.search({ term, location })
    .then((data) => {
      // Response object containing payload from Yelp API server.
      const responseObj = Object.assign({},
        MSG.SUCCESS.YELP.API_SUCCESS,
        { payload: data });

      // Return response to the client.
      return res.json(responseObj);
    })
    .catch((err) => {
      // Response object containing error message from Yelp API server.
      const responseObj = Object.assign({},
        MSG.ERROR.YELP.API_ERROR,
        { payload: JSON.parse(err.data) });

      // Return response to error handling route.
      return next(responseObj);
    });

  // Useless return statement to keep linter happy.
  return null;
};

// Export route definition.
module.exports = search;
