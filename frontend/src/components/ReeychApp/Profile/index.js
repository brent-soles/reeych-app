import React, { useContext } from 'react';

import Avatar from './Avatar';
import StoreContext from '../../../store/context';


function Profile() {
  const { state, dispatch } = useContext(StoreContext);
  const { profile, spaces } = state
  
  return <Avatar 
    profileData={profile}
    spacesData={spaces}
    dispatch={dispatch}
  />;
}

export default Profile;