import React, { useReducer} from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import InitClient from './lib/Apollo/init';
import StoreContext from './store/context';
import hydrateReducerState from './store';
import * as serviceWorker from './serviceWorker';

const { reducer, seed } = hydrateReducerState();
console.log('index seed', seed);
function Application() {

  const [state, dispatch] = useReducer(reducer, seed);
  return (
    <ApolloProvider client={InitClient({
      endpoint: 'http://localhost:7000/graphql'
    })}>
      <StoreContext.Provider value={{ state, dispatch }}>
        <App />
      </StoreContext.Provider>
    </ApolloProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();