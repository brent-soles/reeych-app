import React from 'react';

import Avatar from './Avatar';

/*** Mock User Data */

const userMockData = {
  name: {
    first: 'Test',
    last: 'Testington',
    full: 'Test Testington'
  },
  emails: [
    {
      key: 0,
      email: 'test@test.com',
      verified: true,
      primary: true
    },
    {
      key: 1,
      email: 'test2@test.com',
      verified: true,
      primary: false
    }
  ],
  memberships: ["org1", "org2"],
  cards: [],
}

/*** End Mock User Data */

function Profile() {

  return <Avatar {...userMockData} />;
}

export default Profile;