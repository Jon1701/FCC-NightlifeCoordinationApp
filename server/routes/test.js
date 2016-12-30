// Route definition.
const test = (req, res) => {
  // Message.
  const msg = 'Endpoint success: localhost:8080/api/test';

  // Return message.
  return res.json(msg);
};

// Export route definition.
module.exports = test;
