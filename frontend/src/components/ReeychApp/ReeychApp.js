import React from 'react';
import { Router } from '@reach/router';

import Profile from './Profile';
import Dashboard from './Dashboard';
// import CardBoardQuery from './Cards/CardMutations/CardBoardQuery';

const Settings = () => {
  return <h1> Yay settins </h1>;
}


function ReeychApp({ id }){
  console.log('in aaaapp', id)
  return(
    <>
      <Profile />
      <Router>
        <Settings path="settings" />
        <Dashboard path="/" default />
      </Router>
    </>
  )
}

export default ReeychApp;