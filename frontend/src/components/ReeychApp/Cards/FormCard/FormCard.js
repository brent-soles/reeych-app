/**
 * Render propr form card
 */

import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import styled from '@emotion/styled';
import _ from 'lodash';


const CardContainerGrid = styled.div`
    display: grid;
    margin: 0 auto;
`;

const FormCard = (props) => {
    const { id, 
        render, 
        onSubmit, 
        initialState, 
        mutation, 
        mutationName,
        clearOnSubmit 
    } = props;

    const [prevState, setPrevState] = useState({...initialState});
    const [state, setState] = useState({...initialState});
    const [expanded, setExpanded] = useState(false);
    const [edited, setEdited] = useState(false);

    // ComponentDidMount
    useEffect(() => {
        setState(() => {
            console.log(`initialState`);
            return {...initialState};
        });

        setPrevState(() => {
            return {...state}
        });
        
    }, [])

    // ComponentDidUpdate on initialstate changing
    // will only change if
    useEffect(() => {
        // Check if state is same as initial
        // if so, update
        if(!_.isEqual(state, initialState)){
            setState({...initialState});
        }

    // Condition is to check only if initial state changes
    }, [initialState])

    return (
        <CardContainerGrid>
            <Mutation 
                mutation={mutation}
            >
                {(mutationAction, { data }) => (
                    // Passes event to props submit
                    <form id={id} 
                        onSubmit={async e => {
                            // Prevents reload of page
                            // Bad UX if there is a reload
                            e.preventDefault();
                            console.log(e.currentTarget)
                            document.activeElement.blur() //Trigger blur for currently active element
                            console.log("SUBMITTING:")
                            console.log(state);
                            // TODO: Implement history checking
                            // Check to see if there is a diff in state & prev state
                            // const st = await _.isEqual(state, prevState);
                            const { data } = await mutationAction({variables: {id, ...state}});
                            if(data){
                                
                                if(!_.isEqual(state, data[mutationName])){
                                    console.log(state);
                                    console.log(data[mutationName]);
                                    // throw new Error(`State differs from returned state
                                    // > There was a problem with ${mutationName} mutation
                                    // `)
                                }
                                
                                if(clearOnSubmit){
                                    setState({});
                                }
                            }
                        }
                    }>
                        {render({ state, expanded, edited, prevState, setState, setEdited, setExpanded, setPrevState })}
                    </form>
                )}
            </Mutation>
        </CardContainerGrid>
    )
}

export default FormCard;