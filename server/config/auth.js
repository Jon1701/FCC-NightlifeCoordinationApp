// Module definition.
const auth = {
  YELP: {
    CONSUMER_KEY: process.env.YELP_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.YELP_CONSUMER_SECRET,
    TOKEN: process.env.YELP_TOKEN,
    TOKEN_SECRET: process.env.YELP_TOKEN_SECRET,
  },
};

// Module export.
module.exports = auth;
