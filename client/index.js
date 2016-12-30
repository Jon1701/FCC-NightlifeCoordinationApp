////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
let store = createStore(reducers);

/*
// Subscribe to state changes.
store.subscribe(() => {
  console.log(store.getState());
});
*/

// Application stylesheet.
require("stylesheets/stylesheet.scss");

// Application Container.
// Contains redux store, and client routes.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={}/>
    </Router>
  </Provider>
)

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
