import React, { useContext } from 'react';
import { Redirect } from '@reach/router';

import SpaceContext from '../../../store/context';

function ProtectedRoute(props){
  const { state } = useContext(SpaceContext);
  const authenticated = state.authentication;
  return authenticated ? props.children : <Redirect to="/auth" noThrow />;
}

export default ProtectedRoute;