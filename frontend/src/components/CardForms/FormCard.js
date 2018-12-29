/**
 * Render propr form card
 */

import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import styled from '@emotion/styled';


const CardContainerGrid = styled.div`
    display: grid;
`;

const FormCard = (props) => {
    const { id, render, onSubmit, initialState, update } = props;

    const [prevState, setPrevState] = useState({...initialState});
    const [state, setState] = useState({...initialState});
    const [expanded, setExpanded] = useState({on: false});
    const [edited, setEdited] = useState({editing: false});

    // Returns true on state diff & false if no diff
    const validateStateDiff = async (state, prevState) => {
        if(!state || !prevState){
            throw { err: `State provided is of type: ${!state ? typeof(state) : typeof(prevState)}`};
        }
        // Go through each 1st level key and check
        // to see if values are the same
        // If not, return true for diff in state
        for(const key in state){
            if(!prevState[key]){
                return true;
            }
            if(state[key] !== prevState[key] 
            || typeof(state[key]) !== typeof(prevState[key])){
                console.log("TRUE");
                return true;
            }
        }

        return false;
    }

    // TODO: Add 'esc' key to blur whole form

    return (
        <CardContainerGrid>
            <Mutation mutation={update}>
                {(updateCard, { data }) => (
                    // Passes event to props submit
                    <form id={id} 
                        onKeyPress={e => console.log(e.keyCode)}
                        onSubmit={async e => {
                            e.preventDefault();
                            document.activeElement.blur() //Trigger blur for currently active element
                            //Check to see if there is a diff in state & prev state
                            if(await validateStateDiff(state, prevState)){
                                console.log("Change needed!:")
                                setPrevState(state);
                                console.log(state);
                                console.log(prevState);
                                
                            } else {
                                console.log("No change")
                                console.log(state);
                                console.log(prevState);
                            }
                        }}>
                        {render({ state, expanded, edited, prevState, setState, setEdited, setExpanded, setPrevState })}
                        <input style={{display: 'none'}} type="submit"></input>
                    </form>
                )}
            </Mutation>
        </CardContainerGrid>
    )
}

export default FormCard;