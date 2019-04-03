import React from 'react';
import { Router } from '@reach/router';

import Profile from './Profile';
import Dashboard from './Dashboard';

const Settings = () => {
  return <h1> Yay settins </h1>;
}


function ReeychApp(props){
  return(
    <>
      <Profile />
      <Router>
        <Dashboard path={props.spaceId} default />
        <Settings path={`${props.spaceId}/settings`} />
      </Router>
    </>
  )
}

export default ReeychApp;