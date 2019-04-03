import React, { useContext } from 'react';

import Avatar from './Avatar';

/*** Mock User Data */
import { AuthContext } from '../../Authentication/AuthContext';
/*** End Mock User Data */

function Profile() {
  const { authCtx: { profile } } = useContext(AuthContext);
  return <Avatar {...profile} />;
}

export default Profile;