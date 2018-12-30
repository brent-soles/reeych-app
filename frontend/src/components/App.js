import React, { Component } from 'react';
import { Router } from '@reach/router';
import ReeychApp from './ReeychApp';

// TODO: Get rid of default "/" component

class App extends Component {
  render() {
    return (
        <Router >
            <ReeychApp path="/" spaceId={"5c2123535d195f7f09fbfd50"}/>
            <ReeychApp path="space/:spaceId" />
        </Router>
    );
  }
}

export default App;
