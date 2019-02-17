import React, { useState } from 'react';

// Custom Components
import { PrimaryButton } from '../SharedComponents/Styles/StyledButtons';

const _onSubmit = ( { first, last, email, password } ) => {
    console.log(`Name: ${first} ${last}`);
    console.log(`Login email: ${email}`);
    console.log(`Login password: ${password}`)
}

const defaultState = { 
    first: '', 
    last: '', 
    email: '', 
    password: '' 
}

function Register( ){
    const [state, setState] = useState(defaultState);
    return (
        <form id="reeych-login" onSubmit={(e) => { 
            e.preventDefault();
            _onSubmit(state) 
            setState(defaultState);
        }}>
            <label>
                First:
                <input 
                    name="first" 
                    type="text" 
                    value={state.first} 
                    onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) } 
                />
            </label>
            <label>
                Last:
                <input 
                    name="last" 
                    type="text" 
                    value={state.last} 
                    onChange={ e => setState({ ...state, [e.target.name]: e.target.value }) } 
                />
            </label>
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

export default Register;