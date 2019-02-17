import React from 'react';
import { Redirect } from '@reach/router';

function ProtectedRoute( {component: Component, isAuthed, ...rest } ){
    return isAuthed ? <Component {...rest} /> : <Redirect to="/auth" noThrow />;
}

export default ProtectedRoute;