import React from 'react';
import { Redirect, Router, Link } from '@reach/router';

import Login from './Login';
import Register from './Register';

function AuthForms() {
    return (
        <div>
            <Router>
                <Login path="login"/>
                <Register path="register" />
                <Redirect from="/" to="auth/login" default noThrow />
            </Router>
            <nav>
                <Link to="login">Login</Link> | {" "}
                <Link to="register">Register</Link>
            </nav>
        </div>
    );
}

export default AuthForms;