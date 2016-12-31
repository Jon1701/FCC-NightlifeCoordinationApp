// React.
import React from 'react';

// Redux.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Actions.
import { deleteToken } from 'actions/index';  // Remove token from redux state.

// Component Definition.
class LogoutPage extends React.Component {

  // Lifecycle method.
  componentDidMount() {
    // Remove the token from application state.
    this.props.deleteToken();
  }

  // Component render.
  render() {
    return (
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="box has-text-centered">

            You are now logged out!

          </div>
        </div>
      </div>
    );
  }
}

// Allow access of dispatch actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ deleteToken }, dispatch));

// Allow component access to Redux store.
export default connect(null, mapDispatchToProps)(LogoutPage);

// Typecheck this.props.
LogoutPage.propTypes = {
  deleteToken: React.PropTypes.func,
};
