// Response object containing response status code, and error/success message.
const response = (code, message) => ({ code, message });

// Error messages.
const errors = {
  YELP: {
    NO_LOCATION: response('NO_LOCATION', 'No location provided.'),
    NO_TERM: response('NO_TERM', 'No search term provided.'),
    API_ERROR: response('API_ERROR', 'An error occurred while accessing the Yelp API.'),
  },
  SIGNUP: {
    MISSING_CREDENTIALS: response('MISSING_CREDENTIALS', 'Both a username and password are required.'),
    INVALID_USERNAME: response('INVALID_USERNAME', 'Invalid username. Valid characters are letters, numbers, and underscore. Must be between 8 and 25 characters long.'),
    INVALID_PASSWORD: response('INVALID_PASSWORD', 'Invalid password. Valid characters are letters, numbers, and underscore. Must be between 8 and 50 characters long.'),
    PASSWORD_MISMATCH: response('PASSWORD_MISMATCH', 'Passwords do not match.'),
    MISSING_PASSWORD_CONFIRMATION: response('MISSING_PASSWORD_CONFIRMATION', 'Both password and password confirmation are required.'),
    USER_EXISTS: response('USER_EXISTS', 'User already exists.'),
  },
  DB: {
    DB_ERROR: response('DB_ERROR', 'Unknown database error occurred.'),
  },
};

// Success messages.
const successes = {
  SIGNUP: {
    USER_CREATED: response('USER_CREATED', 'User successfully created.'),
  },
  YELP: {
    API_SUCCESS: response('API_SUCCESS', 'Data successfully retrieved via Yelp API.'),
  },
};

// Export error and success response objects.
module.exports = {
  ERROR: errors,
  SUCCESS: successes,
};
