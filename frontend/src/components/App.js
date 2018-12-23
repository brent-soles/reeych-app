import React, { Component } from 'react';
import { Router } from '@reach/router';
import ReeychApp from './ReeychApp';

class App extends Component {
  render() {
    return (
        <Router >
            <ReeychApp path="/"/>
            <ReeychApp path="/:spaceId" />
        </Router>
    );
  }
}

export default App;
