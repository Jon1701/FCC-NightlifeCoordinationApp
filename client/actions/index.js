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

// Action to save token.
export const storeToken = results => (
  {
    type: 'STORE_TOKEN',
    payload: results,
  }
);

// Action to delete token.
export const deleteToken = () => (
  {
    type: 'DELETE_TOKEN',
  }
);
