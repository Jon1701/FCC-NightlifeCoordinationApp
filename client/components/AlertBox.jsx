// Dependencies.
import React from 'react';  // React library.
import classNames from 'classnames';  // Toggleable class names.

// Component definition.
export default class AlertBox extends React.Component {
  // Component render.
  render() {
    // Different views if alert data was provided.
    if (this.props.alert) {
      // Deconstruct props.
      const { type, message } = this.props.alert;

      // Classes to control style of <alert/>.
      const myStyles = classNames({
        message: true,
        'has-text-centered': true,
        'is-danger': type === 'DANGER',
        'is-success': type === 'SUCCESS',
        'is-info': type === 'INFO',
        'is-warning': type === 'WARNING',
      });

      return (
        <article className={myStyles} onClick={this.props.handleClose}>
          <div className="message-body">
            {message}
          </div>
        </article>
      );
    } else {
      // Hidden alert box if no alert data was provided.
      return (
        <div className="hidden" />
      );
    }
  }
}

// Typecheck this.props.
AlertBox.propTypes = {
  alert: React.PropTypes.shape({
    type: React.PropTypes.string,
    message: React.PropTypes.string,
  }),
  handleClose: React.PropTypes.func,
};
