import React from 'react';
import { Router } from '@reach/router';

import Profile from './Profile';
import Dashboard from './Dashboard';
import TestCard from './Cards/Card';
// import CardBoardQuery from './Cards/CardMutations/CardBoardQuery';

const Settings = () => {
  return <h1> Yay settins </h1>;
}


function ReeychApp({ space }){
  console.log('in aaaapp', space)
  return(
    <>
      <Profile />
      <Router>
        <Settings path="settings" />
        <TestCard path="tc/:id" space={space}/>
        <Dashboard path="/" default />
      </Router>
    </>
  )
}

export default ReeychApp;