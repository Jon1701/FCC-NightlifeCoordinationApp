// Redux dependencies.
import { combineReducers } from 'redux';  // Combines many reducers into one.

// Reducers.
import resultsReducer from './reducer_results'; // Reducer to manipulate search results.
import tokenReducer from './reducer_jwt'; // Reducer to manipulate JSON web token.

// Combine all reducers into one state object.
const reducers = combineReducers({
  results: resultsReducer,  // this.state.results.
  token: tokenReducer,  // this.state.token.
});

// Export the redux state.
export default reducers;
