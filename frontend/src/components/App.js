import React, { Component } from 'react';
import { Router, Link, Redirect } from '@reach/router';

// Non-npm Components
import AuthForms from './Authentication/AuthForms';
import ReeychApp from './ReeychApp/ReeychApp';

import ProtectedRoute from './SharedComponents/Utilities/ProtectedRoute';

// TODO: Get rid of default "/" component

const isAuthed = false;

class App extends Component {
  render() {
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
                <Redirect from={window.location.pathname} to={isAuthed ? `/app/${10}` : "auth/login"} default noThrow />
            </Router>
        </div>
    );
  }
}

export default App;
