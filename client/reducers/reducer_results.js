// Reducer definition.
const results = (state = null, action) => {
  switch (action.type) {
    // Store action payload into state.
    case 'STORE_RESULTS':
      return action.payload;

    // Delete existing results from state.
    case 'DELETE_RESULTS':
      return null;

    // Return empty state by default.
    default:
      return state;
  }
};

// Export reducer.
export default results;
