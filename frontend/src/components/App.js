import React, { useContext } from 'react';
import { Router, Link, Redirect } from '@reach/router';

// Non-npm Components
import ProtectedRoute from './SharedComponents/Utilities/ProtectedRoute';
import AuthForms from './Authentication/AuthForms';
import ReeychApp from './ReeychApp/ReeychApp';
import { AuthContext } from './Authentication/AuthContext';

function App(){
  const { authCtx } = useContext(AuthContext);
  const { isAuthed, currentSpace } = authCtx;
  // console.log('In app', authCtx);
  
  return (
    <div>
      {!isAuthed && <Link to="auth" >Login or Register</Link>}
      <Router basepath="/">
        <ProtectedRoute path="app" >
          <ReeychApp path="r/:space" />
        </ProtectedRoute>
        <AuthForms path="auth/*"/>
        <Redirect from={window.location.pathname} to={isAuthed ? `/app/${currentSpace}` : "auth/login"} default noThrow />
      </Router>
    </div>
  )
}

export default App;
