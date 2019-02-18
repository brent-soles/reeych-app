import React, { useContext } from 'react';
import { Router, Link, Redirect } from '@reach/router';

// Non-npm Components
import ProtectedRoute from './SharedComponents/Utilities/ProtectedRoute';
import AuthForms from './Authentication/AuthForms';
import ReeychApp from './ReeychApp/ReeychApp';
import { AuthContext } from './Authentication/AuthContext';

function App(){
  const { AuthenticationCtx } = useContext(AuthContext);
  const { isAuthed, authId } = AuthenticationCtx;
  console.log('inApp', isAuthed)
  return (
    <div>
        {isAuthed ? 
        <nav>
            <Link to="/logout" onClick={()=> window.location.pathname = '/auth/login'}>Logout</Link>
        </nav>
        :
        <nav>
            <Link to="auth" >Login or Register</Link>
        </nav>}
        
        <Router basepath="/">
            <ProtectedRoute path="app/:id" isAuthed={isAuthed} component={ReeychApp}/>
            <AuthForms path="auth/*"/>
            <Redirect from={window.location.pathname} to={isAuthed ? `/app/${authId}` : "auth/login"} default noThrow />
        </Router>
    </div>
  )
}

export default App;
