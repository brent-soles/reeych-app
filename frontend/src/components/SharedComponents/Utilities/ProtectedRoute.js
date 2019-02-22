import React, { useContext } from 'react';
import { Redirect } from '@reach/router';

import { AuthContext } from '../../Authentication/AuthContext';

function ProtectedRoute( {component: Component, ...rest } ){
  const { authCtx: { isAuthed } } = useContext(AuthContext);
  
  console.log('in pr:', isAuthed);

  //console.log('pr is Authed & rest', isAuthed, {...rest});
  return isAuthed ? <Component {...rest} /> : <Redirect to="/auth" noThrow />;
}

export default ProtectedRoute;