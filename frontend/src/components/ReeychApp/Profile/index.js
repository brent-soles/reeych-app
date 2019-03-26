import React from 'react';

import Avatar from './Avatar';

/*** Mock User Data */
import { profile } from '../../../lib/mockData/profile';
/*** End Mock User Data */

function Profile() {

  return <Avatar {...profile} />;
}

export default Profile;