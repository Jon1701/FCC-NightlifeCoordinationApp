// React dependencies.
import React from 'react';  // React library.

// React components.
import MediaObject from 'components/MediaObject';

// Redux dependencies.
import { connect } from 'react-redux';  // Connect to redux store.

// Component definition.
class SearchResultsWidget extends React.Component {

  // Component render.
  render() {
    // Return hidden element if no search results are provided.
    if (!this.props.results) {
      return (
        <div className="hidden" />
      );
    }

    // For each business, generate HTML with each field.
    const businesses = this.props.results.businesses.map(val => (
      <MediaObject key={val.id} field={val} />
    ));

    // Display results.
    return (
      <div>{businesses}</div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => (
  { results: state.results }
);

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(SearchResultsWidget);

// Typecheck this.props.
SearchResultsWidget.propTypes = {
  results: React.PropTypes.shape({
    businesses: React.PropTypes.array,
  }),
};
