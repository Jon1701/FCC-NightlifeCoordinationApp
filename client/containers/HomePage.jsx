// React dependencies.
import React from 'react';  // Standard React library.

// Redux dependencies.
import { connect } from 'react-redux';  // Connect to redux store.

// Component definition.
class HomePage extends React.Component {

  // Component render.
  render() {
    return (
      <div className="columns has-text-centered">
        <div className="column is-10 is-offset-1">

          <div className="box">

            <h1 className="title">Nightlife Coordination</h1>

            <h5 className="subtitle is-5">A FreeCodeCamp project</h5>

          </div>

          <div className="box">
            Search widget
          </div>

        </div>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => (
  {
    results: state.results,
  }
);

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(HomePage);
