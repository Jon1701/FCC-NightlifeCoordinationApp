// Reducer definition.
const jwt = (state = null, action) => {
  switch (action.type) {
    // Store action payload into state.
    case 'STORE_TOKEN':

      // Store results in session storage.
      try {
        sessionStorage.setItem('token', action.payload);
      } catch (e) {
        // Do nothing.
      }

      // Return results in reducer.
      return action.payload;

    // Delete existing results from state.
    case 'DELETE_TOKEN':
      // Remove token in session storage.
      try {
        sessionStorage.removeItem('token');
      } catch (e) {
        // Do nothing.
      }
      return null;

    // Return empty state by default.
    default:
      return state;
  }
};

// Export reducer.
export default jwt;
