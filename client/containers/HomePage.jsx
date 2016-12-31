// React dependencies.
import React from 'react';  // Standard React library.

// Redux dependencies.
import { connect } from 'react-redux';  // Connect to redux store.
import { bindActionCreators } from 'redux'; // Bind action creators.

// React components.
import SearchWidget from 'components/SearchWidget';
import SearchResultsWidget from 'components/SearchResultsWidget';

// Actions.
import { storeResults, deleteResults } from 'actions/index';  // Redux actions.

// Component definition.
class HomePage extends React.Component {

  // Component Lifecycle Method.
  componentDidMount() {
    // Read search results from session storage.
    const results = JSON.parse(sessionStorage.getItem('results'));

    // If search results were found, store it in redux state.
    if (results) {
      this.props.storeResults(results);
    }
  }

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
            <SearchWidget />
          </div>

          <SearchResultsWidget />

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

// Allow access of dispatch actions as props.
const mapDispatchToProps = dispatch => (
  bindActionCreators({ storeResults, deleteResults }, dispatch)
);

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
