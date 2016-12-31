// React.
import React from 'react';

// React Router.
import { Link } from 'react-router';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux Actions.
import { storeToken } from 'actions/index';

// Component definition.
class NavigationBar extends React.Component {

  // Component Lifecycle Method.
  componentDidMount() {
    // Get JSON web token.
    const token = sessionStorage.getItem('token');

    // If token is in session storage, store it in redux state.
    if (token) {
      this.props.storeToken(token);
    }
  }

  // Component render.
  render() {
    return (
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="nav-item is-brand">
            FCC Nightlife Coordination
          </Link>
        </div>

        {/* Different navigation buttons for authenticated and unauthenticated users. */}
        {this.props.token ? <LoggedIn /> : <NotLoggedIn />}
      </nav>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow access of dispatch actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ storeToken }, dispatch));

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

// Typecheck this.props.
NavigationBar.propTypes = {
  storeToken: React.PropTypes.func,
  token: React.PropTypes.string,
};

/*
 *
 *  Presentational Components.
 *
 */

// Navigation Bar buttons for unauthenticated users.
const NotLoggedIn = () => (
  <div className="nav-center">
    <Link to="/signup" className="nav-item">Sign up</Link>
    <Link to="/login" className="nav-item">Log In</Link>
  </div>
);

// Navigation Bar buttons for authenticated users.
const LoggedIn = () => (
  <div className="nav-center">
    <Link className="nav-item">Logout</Link>
  </div>
);
