// React.
import React from 'react';

// React Components.
import NavigationBar from 'components/NavigationBar'; // Navigation Bar.

// Redux.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Component definition.
class App extends React.Component {
  // Component Render.
  render() {
    return (
      <div>
        <NavigationBar />

        {/* Render child components. */}
        {this.props.children}
      </div>
    );
  }
}

// Allow component access to Redux store.
export default connect(null, null)(App);
