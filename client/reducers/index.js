// Redux dependencies.
import { combineReducers } from 'redux';  // Combines many reducers into one.

// Reducers.
import resultsReducer from './reducer_results'; // Reducer to manipulate search results.

// Combine all reducers into one state object.
const reducers = combineReducers({
  results: resultsReducer,  // this.state.results
});

// Export the redux state.
export default reducers;
