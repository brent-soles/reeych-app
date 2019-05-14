import React, { useContext } from 'react';
import { Router, Link, Redirect } from '@reach/router';

// Non-npm Components
import ProtectedRoute from './SharedComponents/Utilities/ProtectedRoute';
import AuthForms from './Authentication/AuthForms';
import ReeychApp from './ReeychApp/ReeychApp';
import StoreContext from '../store/context';

function App(){
  const { state } = useContext(StoreContext);
  console.log('App.js:', state);
  const { authenticated } = state.authentication;
  const { spaces } = state.profile;

  return (
    <div>
      {!authenticated && <Link to="auth" >Login or Register</Link>}
      <Router basepath="/">
        <ProtectedRoute path="app" >
          <ReeychApp path="space/:spaceId" />
        </ProtectedRoute>
        <AuthForms path="auth/*"/>
        <Redirect from={window.location.pathname} to={authenticated ? `/app/space/${spaces.current}` : "auth/login"} default noThrow />
      </Router>
    </div>
  )
}

export default App;
