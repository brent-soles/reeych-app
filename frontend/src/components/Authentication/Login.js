import React, { useState } from 'react';
import { Redirect } from '@reach/router';
import Cookies from 'cookies-js';

// Custom Components
import { PrimaryButton } from '../SharedComponents/Styles/StyledButtons';

const _onSubmit = ( { email, password } ) => {
    console.log(`Login email: ${email}`);
    console.log(`Login password: ${password}`)
}

const defaultState = {
    email: '', 
    password: ''
}

function Login(){
    const [state, setState] = useState(defaultState);
    const [isAuthed, setIsAuthed] = useState({
        status: false,
        id: -1
    });
    
    if(isAuthed.status){
        // return <h1>AUTHED</h1>
        return <Redirect to={`app/${isAuthed.id}`} noThrow />
    } else {
        return (
            <form id="reeych-login" onSubmit={ async (e) => {
                e.preventDefault();
                _onSubmit(state);
                try{
                    const res = await fetch(`/gettoken`);
                    if(res.status === 200){
                        console.log(Cookies.get('reeych-auth'))
                        setIsAuthed({ status: true, id: res.status });
                    }
                    console.log(res);
                } catch(err) {

                }
            }}>
                <label>
                    Email:
                    <input 
                        name="email" 
                        type="text" 
                        value={state.email} 
                        onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) } 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        name="password"
                        type="password"
                        value={state.password}
                        onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) } 
                    />
                </label>
                <PrimaryButton type="submit" >Submit</PrimaryButton>
            </form>
        )
    }
}

export default Login;