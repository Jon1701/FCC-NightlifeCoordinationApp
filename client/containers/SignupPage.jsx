// React.
import React from 'react';

// React Components.
import SignupWidget from 'components/SignupWidget';

// Component definition.
const SignupPage = () => (
  <div className="columns">
    <div className="column is-10 is-offset-1">
      <div className="box">
        <div className="has-text-centered">
          <SignupWidget redirectEnabled={true}/>
        </div>
      </div>
    </div>
  </div>
);

// Export component.
export default SignupPage;
