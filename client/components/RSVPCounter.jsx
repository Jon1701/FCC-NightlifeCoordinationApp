// React
import React from 'react';
import classNames from 'classnames';

// Redux
import { connect } from 'react-redux';

// Component definition.
class RSVPCounter extends React.Component {

  // Component render.
  render() {
    // Deconstruct props.
    const { rsvpStatus, token, handleClick, rsvpCount } = this.props;

    // Classes to control button styling.
    const myClasses = classNames({
      button: true,
      'is-primary': rsvpStatus,
    });

    return (
      <button className={myClasses} onClick={token ? handleClick : null}>
        {rsvpCount} going
      </button>
    );
  }

}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(RSVPCounter);

// Prop validation.
RSVPCounter.propTypes = {
  rsvpCount: React.PropTypes.number,
  rsvpStatus: React.PropTypes.bool,
  handleClick: React.PropTypes.func,
  token: React.PropTypes.string,
};
