import React, { Component } from 'react';
import { Router, Link } from '@reach/router';

import ReeychApp from './ReeychApp';

const Home = () => (
    <div>HOOOOEM</div>
)

const Dev = () => (
    <div>DEV</div>
)


class App extends Component {
  render() {
    return (
      <Router >
          <ReeychApp path="/"/>
          <ReeychApp path="/:spaceId"/>
      </Router>
    );
  }
}

export default App;
