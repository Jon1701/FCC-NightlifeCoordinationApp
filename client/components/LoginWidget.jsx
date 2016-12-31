// React
import React from 'react';

// React Components.
import AlertBox from 'components/AlertBox';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Actions.
import { storeToken } from 'actions/index';

// Other
const request = require('common/request');  // Make HTTP GET/POST requests

/*
 *
 *  Component Definition.
 *
 */
class LoginWidget extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local component state.
    this.state = {
      alert: null,  // Alert box data.
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

    // Get form field contents.
    const username = this.usernameInput.value.trim();
    const password = this.passwordInput.value.trim();

    // Send a request to the API Login endpoint, pass in username and password.
    request.post('/api/login', { username, password })
      .then((res) => {
        // Store results if correct response is received by server.
        switch (res.data.code) {
          // Store JSON web token in redux state.
          case 'LOGIN_SUCCESS':
            this.props.storeToken(res.data.payload.token);
            break;

          // Unexpected response, show error box.
          default:
            this.setAlert('DANGER', 'Unknown server error.');
            break;
        }
      })
      .catch((err) => {
        // Set alert box based on the server response.
        this.setAlert('DANGER', err.response.data.message);
      });
  }

  // Method to handle form reset.
  handleFormReset(e) {
    // Prevent default form action.
    e.preventDefault();

    // Reset form fields.
    this.usernameInput.value = '';
    this.passwordInput.value = '';

    // Clear alert.
    this.clearAlert();
  }

  // Render.
  render() {
    return (
      <div>
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form onSubmit={this.handleFormSubmit} method="POST">
          <label htmlFor="usernameInput" className="label">Username:</label>
          <p className="control">
            <input
              className="input"
              id="usernameInput"
              ref={(input) => { this.usernameInput = input; }}
              type="text"
              minLength="8"
              maxLength="25"
            />
          </p>

          <label htmlFor="passwordInput" className="label">Password:</label>
          <p className="control">
            <input
              className="input"
              id="passwordInput"
              ref={(input) => { this.passwordInput = input; }}
              type="password"
              minLength="8"
              maxLength="50"
            />
          </p>

          <br />

          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <button className="button is-primary">Login</button>
              {' '}
              <button className="button is-primary" onClick={this.handleFormReset}>Reset</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow access of dispatch actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ storeToken }, dispatch));

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);

// Typecheck this.props.
LoginWidget.propTypes = {
  storeToken: React.PropTypes.func,
};
