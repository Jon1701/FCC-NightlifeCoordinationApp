// Response object containing response status code, and error/success message.
const response = (code, message) => ({ code, message });

// Error messages.
const errors = {
  YELP: {
    NO_LOCATION: response('NO_LOCATION', 'No location provided.'),
    NO_TERM: response('NO_TERM', 'No search term provided.'),
    API_ERROR: response('API_ERROR', 'An error occurred while accessing the Yelp API.'),
  },
};

// Success messages.
const successes = {
  YELP: {
    API_SUCCESS: response('API_SUCCESS', 'Data successfully retrieved via Yelp API.'),
  },
};

// Export error and success response objects.
module.exports = {
  ERROR: errors,
  SUCCESS: successes,
};
