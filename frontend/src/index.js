import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import InitClient from './lib/Apollo/init';

import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    // `InitClient` initializes the cache as well
    // This then passes down the 'client' prop to children
    <ApolloProvider client={InitClient({
        endpoint: 'http://localhost:7000/graphql'
    })}>
        <App />
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();