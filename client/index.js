// React dependencies.
import React from 'react';
import ReactDOM from 'react-dom';

// React Router dependencies.
import { Router, Route, browserHistory } from 'react-router';

// Redux dependencies.
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
const store = createStore(reducers);

// React components.
import HomePage from 'containers/HomePage';

// Application stylesheet.
require("stylesheets/stylesheet.scss");

// Application UI Container.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} />
    </Router>
  </Provider>
);

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
