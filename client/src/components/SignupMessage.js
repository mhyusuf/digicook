import React, { useState } from 'react';

function SignupMessage() {
  const [showMessage, setShowMessage] = useState(true);

  const displayStyle = showMessage ? 'block' : 'none';
  return (
    <div className="ui visible info message" style={{ display: displayStyle }}>
      <i className="close icon" onClick={() => setShowMessage(false)}></i>
      <div className="header">
       {/*  Link to backend login route */}
        <a href="/auth/google">Log in</a> to share your recipes!
      </div>
    </div>
  );
}

export default SignupMessage;
