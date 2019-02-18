import React, { useState, useContext } from 'react';
import { Redirect } from '@reach/router';

// Custom Components
import { AuthContext } from './AuthContext';
import { PrimaryButton } from '../SharedComponents/Styles/StyledButtons';

function Login(){
  // Get's auth context, and method to update Auth stats upon successful login
  // Ref: src/lib/hook/useStatefulContext.js to see how ctx methods are applied
  const { AuthenticationCtx, setAuthenticationCtx } = useContext(AuthContext);
  const { isAuthed, authId } = AuthenticationCtx;

  // Keep tabs on current state form
  // TODO: add validation of fields
  const [ formData, setFormData ] = useState({
    email: '',
    passwd: ''
  });

  // If user has been authenticated redirect to app
  // app/* is a protected route
  // If user has not been authenticated yet, keep showing form
  if(isAuthed){
    return <Redirect to={`app/${authId}`} noThrow />
  } else {
    const { email, passwd } = formData;
    return (
      <form id="reeych-login" onSubmit={ async (e) => {
        e.preventDefault();
          try{

            // Upon successful login, set auth flag to true and udpate ID
            // Id is used to verifiy upon further requests
            setAuthenticationCtx({...AuthenticationCtx, isAuthed: true });
          } catch(err) {
            throw new Error(`We are having trouble connecting`);
          }
        }}>
        {/* Begin Form */}
        <label htmlFor="email">
          Email:
          <input name="email" type="text" 
            value={email} 
            onChange={e => setFormData({ ...formData, email: e.target.value })} 
          />
        </label>
        <label htmlFor="email">
          Password:
          <input name= "passwd" type="password" 
            value={passwd} 
            onChange={e => setFormData({ ...formData, passwd: e.target.value })} 
          />
        </label>
        <PrimaryButton type="submit" >Submit</PrimaryButton>
      </form>
    )
  }
}

export default Login;