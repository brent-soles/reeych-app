import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import InitClient from './lib/Apollo/init';
import { AuthContext } from './components/Authentication/AuthContext';
import useStatefulContext from './lib/hooks/useStatefulContext';

import * as serviceWorker from './serviceWorker';

function Application() {

  const { AuthenticationContext, value } = useStatefulContext(AuthContext, {
    name: "Authentication",
    initValues: {
      isAuthed: false,
      authId: 567
    }
  })

  return (
    <ApolloProvider client={InitClient({
      endpoint: 'http://localhost:7000/graphql'
    })}>
      <AuthenticationContext.Provider value={value}> 
        <App />
      </AuthenticationContext.Provider>
    </ApolloProvider>
  );
}

ReactDOM.render( <Application />, document.getElementById('root'));

//let defAuthed = false;


// ReactDOM.render(
//     // `InitClient` initializes the cache as well
//     // This then passes down the 'client' prop to children
//     <ApolloProvider client={InitClient({
//         endpoint: 'http://localhost:7000/graphql'
//     })}>
//         <AuthContext.Provider value={{
//           isAuthed: defAuthed,
//           authId: 567,
//           updateAuth: (newAuth) => {
//             console.log(`New auth: ${newAuth}`);
//             defAuthed = newAuth;
//           }
//         }}> 
//             <App />
//         </AuthContext.Provider>
//     </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();