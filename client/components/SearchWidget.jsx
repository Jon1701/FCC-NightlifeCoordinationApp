// React dependencies.
import React from 'react';  // React library.

// Redux dependencies.
import { connect } from 'react-redux';  // Connect to redux store.
import { bindActionCreators } from 'redux'; // Bind action creators.

// Actions.
import { storeResults, deleteResults } from 'actions/index';  // Redux actions.

// React components.
import AlertBox from 'components/AlertBox'; // Alert box.

// Other modules.
import request from 'common/request'; // Axios wrapper.

// Component definition.
class SearchWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local component state.
    this.state = {
      alert: null,  // Alert box data.
      searchInProgress: false,  // Flag to see if a search is in progress.
    };

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Form submit handler.
    this.handleFormReset = this.handleFormReset.bind(this); // Form reset handler.
    this.setAlert = this.setAlert.bind(this); // Sets alert box type and message.
    this.clearAlert = this.clearAlert.bind(this); // Clear alert box type and message.
  }

  // Method to set notification box.
  setAlert(type = 'INFO', message) {
    this.setState({
      alert: { type, message },
    });
  }

  // Method to clear notification box.
  clearAlert() {
    this.setState({
      alert: null,
    });
  }

  // Method to handle form submit.
  handleFormSubmit(e) {
    // Prevent default form action.
    e.preventDefault();

    // Delete any existing search results from redux state.
    this.props.deleteResults();

    // Get form field contents.
    const term = 'bar'; // this.termInput.value.trim();
    const location = this.locationInput.value.trim();

    // Encode a URI to the API endpoint along with the search term and location.
    const uri = encodeURI(`/api/search?term=${term}&location=${location}`);

    // Send a request to the API Search endpoint.
    request.get(uri)
      .then((res) => {
        // Store results if correct response is received by server.
        switch (res.data.code) {
          // Store search results in redux state.
          case 'API_SUCCESS':
            this.props.storeResults(res.data.payload);
            break;

          // Unexpected response, show error box.
          default:
            this.setAlert('DANGER', 'Unknown server error.');
            break;
        }
      })
      .catch((err) => {
        // Get error response code.
        const code = err.response.data.code;

        // Set alert box based on the error code returned by the server.
        switch (code) {
          // No search term provided.
          case 'NO_TERM':
            // this.setAlert('DANGER', 'We need to know what you are looking for!');
            // this.termInput.focus();
            break;

          // No location term provided.
          case 'NO_LOCATION':
            this.setAlert('DANGER', 'We need a location!');
            this.locationInput.focus();
            break;

          // Default case. Unknown response returned by server.
          default:
            this.setAlert('DANGER', 'Unknown server error.');
            break;
        }
      });
  }

  // Method to handle form reset.
  handleFormReset(e) {
    // Prevent default form action.
    e.preventDefault();

    // Reset form fields.
    // this.termInput.value = '';
    this.locationInput.value = '';

    // Clear alert.
    this.clearAlert();

    // Delete search results from redux state.
    this.props.deleteResults();
  }

  // Component render.
  render() {
    return (
      <div>
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form onSubmit={this.handleFormSubmit} method="GET">
          <div className="columns">
            <div className="column">
              <p className="control">
                <input
                  id="locationInput"
                  className="input"
                  type="text"
                  ref={(input) => { this.locationInput = input; }}
                  placeholder="eg: Toronto, Manhattan, San Francisco?"
                />
              </p>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <button className="button is-primary">Search</button>
              {' '}
              <button className="button is-primary" onClick={this.handleFormReset}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => (
  { results: state.results }
);

// Allow access of dispatch actions as props.
const mapDispatchToProps = dispatch => (
  bindActionCreators({ storeResults, deleteResults }, dispatch)
);

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(SearchWidget);

// Typecheck this.props.
SearchWidget.propTypes = {
  storeResults: React.PropTypes.func,
  deleteResults: React.PropTypes.func,
};
