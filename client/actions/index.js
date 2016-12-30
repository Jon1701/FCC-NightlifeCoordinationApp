// Action to save results.
export const storeResults = results => (
  {
    type: 'STORE_RESULTS',
    payload: results,
  }
);

// Action to delete results.
export const deleteResults = () => (
  {
    type: 'DELETE_RESULTS',
  }
);
