import React, { useContext } from 'react';
import { Redirect } from '@reach/router';

//import UserInfo from './UserInfo';
import { AuthContext } from '../../Authentication/AuthContext';
import Avatar from './Avatar';

/*** Mock User Data */

const userMockData = {
  name: {
      first: 'Test',
      last: 'Testington',
      full: 'Test Testington'
  },
  emails:[ 
      { 
          email: 'test@test.com', 
          verified: true,
          primary: true
      },
      { 
        email: 'test2@test.com', 
        verified: true,
        primary: false
    }
  ],
  memberships: ["org1", "org2"],
  cards: [],
}

/*** End Mock User Data */

function Profile({ id }){
  const { authCtx, setAuthCtx } = useContext(AuthContext);

  
  return <Avatar {...userMockData} />;

  if(id !== authCtx.id.toString()){
    setAuthCtx({...authCtx, isAuthed: false});
    return null;
  } else {
    console.log('About')
    return (
      <div>
        {/* <h1>Hey, your logged in as {id}</h1> */}
        <Avatar {...userMockData} />
      </div>
    )
  }
}

export default Profile;