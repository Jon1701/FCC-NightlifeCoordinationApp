// React
import React from 'react';

// React components.
import RSVPCounter from 'components/RSVPCounter';

// Redux
import { connect } from 'react-redux';

// Other
const request = require('common/request');  // Make HTTP GET/POST requests

/*
 *
 *  Component Definition.
 *
 */
class RSVPWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      rsvpCount: 0,     // RSVP count for this event.
      rsvpStatus: null, // RSVP status.
    };

    // Bind methods to component instance.
    this.toggleGoing = this.toggleGoing.bind(this);
    this.getRSVPCounts = this.getRSVPCounts.bind(this);
    this.getRSVPStatus = this.getRSVPStatus.bind(this);
  }

  // Component Lifecycle Method.
  componentDidMount() {
    // Get RSVP counts.
    this.getRSVPCounts();

    // Get RSVP status if token is provided.
    if (this.props.token) {
      this.getRSVPStatus(); // Get RSVP status.
    }
  }

  // Method to get RSVP status of a user and business.
  getRSVPStatus() {
    // Request body containing the business ID.
    const body = {
      business_id: this.props.businessID,
    };

    // Send POST request to API endpoint.
    request.post('/api/auth/get_rsvp', body, this.props.token)
      .then((res) => {
        // Different actions based on server response.
        switch (res.data.code) {
          // Successfully checked RSVP.
          case 'CHECK_RSVP':
            this.setState({ rsvpStatus: res.data.payload.isRSVP });
            break;
          // Default case: do nothing.
          default:
            break;
        }
      })
      .catch(() => {
        // Nothing to do.
      });
  }

  // Method to get RSVP counts for a business.
  getRSVPCounts() {
    // API endpoint URL.
    const url = `/api/rsvp_count/${this.props.businessID}`;

    // Send GET request to API endpoint to get number of users going to a business.
    request.get(url)
      .then((res) => {
        // Different behaviour on different response codes.
        switch (res.data.code) {
          // Users have been tallied, update RSVP count in state.
          case 'USERS_TALLIED':
            this.setState({ rsvpCount: res.data.payload.count });
            break;
          // Default case.
          default:
            break;
        }
      })
      .catch(() => {
        // Nothing to do.
      });
  }

  // Method to toggle whether or not the user is going to the venue.
  toggleGoing() {
    // Request token and body.
    const token = this.props.token;
    const body = { business_id: this.props.businessID };

    // Send POST request to API endpoing: /api/auth/going.
    request.post('/api/auth/going', body, token)
      .then((res) => {
        // Deconstruct rsvp count and status.
        const { rsvpCount, rsvpStatus } = this.state;

        // Different behaviour on different response codes.
        switch (res.data.code) {

          // User is going to the business, increment RSVP count.
          case 'USER_GOING':
            this.setState({ rsvpCount: rsvpCount + 1, rsvpStatus: !rsvpStatus });
            break;

          // Users is not going, decrement RSVP count.
          case 'USER_NOT_GOING':
            this.setState({ rsvpCount: rsvpCount - 1, rsvpStatus: !rsvpStatus });
            break;

          // Default case.
          default:
            break;
        }
      })
      .catch(() => {
        // Nothing to do.
      });
  }

  // Render.
  render() {
    // If user is authenticated, show a button.
    return (
      <div className="has-text-centered">
        <RSVPCounter
          rsvpStatus={this.state.rsvpStatus}
          rsvpCount={this.state.rsvpCount}
          handleClick={this.toggleGoing}
        />
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(RSVPWidget);

// Prop validation.
RSVPWidget.propTypes = {
  token: React.PropTypes.string,
  businessID: React.PropTypes.string,
};
