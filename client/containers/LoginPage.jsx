// React.
import React from 'react';

// React Components.
import LoginWidget from 'components/LoginWidget';

// Component definition.
const LoginPage = () => (
  <div className="columns">
    <div className="column is-10 is-offset-1">
      <div className="box">
        <div className="has-text-centered">
          <h1 className="title">Log in to Nightlife!</h1>
          <LoginWidget />
        </div>
      </div>
    </div>
  </div>
);

// Export component.
export default LoginPage;
