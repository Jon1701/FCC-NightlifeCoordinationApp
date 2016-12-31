// Reducer definition.
const results = (state = null, action) => {
  switch (action.type) {
    // Store action payload into state.
    case 'STORE_RESULTS':

      // Store results in session storage.
      try {
        sessionStorage.setItem('results', JSON.stringify(action.payload));
      } catch (e) {
        // Do nothing.
      }

      // Return results in reducer.
      return Object.assign({}, action.payload);

    // Delete existing results from state.
    case 'DELETE_RESULTS':
      try {
        sessionStorage.removeItem('results');
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
export default results;
