import React, { useContext } from 'react';
import { Redirect } from '@reach/router';

import { AuthContext } from '../../Authentication/AuthContext';

function ProtectedRoute(props){
  const { authCtx: { isAuthed } } = useContext(AuthContext);
  
  console.log('in pr:', props.children);
  return isAuthed ? props.children : <Redirect to="/auth" noThrow />;
}

export default ProtectedRoute;