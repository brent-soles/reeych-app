import React from 'react';
import { Router } from '@reach/router';

import Profile from './Profile';
import Dashboard from './Dashboard';

const Settings = () => {
  return <h1> Yay settins </h1>;
}


function ReeychApp(props){
  console.log('RA', props);
  return(
    <>
      <Profile />
      <Router>
        <Settings path=":space/settings" />
        <Dashboard path={props.space} default />
      </Router>
    </>
  )
}

export default ReeychApp;