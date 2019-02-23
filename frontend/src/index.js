import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import InitClient from './lib/Apollo/init';
import { AuthContext } from './components/Authentication/AuthContext';

import * as serviceWorker from './serviceWorker';

const reeychDevData = JSON.parse(localStorage.getItem('reeych-dev'));
if(!reeychDevData){
  localStorage.setItem('reeych-dev', JSON.stringify(
    {
      data: {
        isAuthed: false,
        id: 567,
        email: 'test@test.com',
      }
    }
  ));
  throw new Error('local storage init')
}

function Application() {

  const { data } = reeychDevData;
  const [authCtx, setAuthCtx] = useState(data);

  useEffect(() => {
    localStorage.setItem('reeych-dev', JSON.stringify(
      {
        data: authCtx
      }
    ));
  }, [authCtx])


  return (
    <ApolloProvider client={InitClient({
      endpoint: 'http://localhost:7000/graphql'
    })}>
      <AuthContext.Provider value={{ authCtx, setAuthCtx }}> 
        <App />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();