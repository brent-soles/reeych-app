/**
 * Render propr form card
 */

import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import styled from '@emotion/styled';


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


    // console.log(`~~~~~~~~~~~`);
    // console.log(`${id} INITSTATE`);
    // console.log(`~~~~~~~~~~~`);
    // console.log({...initialState});
    // console.log(`~~~~~~~~~~~`);

    const [prevState, setPrevState] = useState({...initialState});
    const [state, setState] = useState({...initialState});
    const [expanded, setExpanded] = useState(false);
    const [edited, setEdited] = useState(false);

    // Returns true on state diff & false if no diff
    const validateStateDiff = async (left, right) => {
        console.log("STATE DIFF");
        //console.log(state);

        if(!left || !right){
            throw { err: `State provided is of type: ${!left ? typeof(left) : typeof(right)}`};
        }
        // Go through each 1st level key and check
        // to see if values are the same
        // If not, return true for diff in state
        for(const key in left){
            if(!right[key]){
                return true;
            }
            if(left[key] !== right[key] 
            || typeof(left[key]) !== typeof(right[key])){
                return true;
            }
        }

        return false;
    }

    // ComponentDidMount
    useEffect(() => {

        setState(() => {
            console.log(`initialState`);
            return {...initialState};
        });

        setPrevState(() => {
            return {...state}
        });
        console.log('~~~~~~~~~~~~~~~~~~~~')
        console.log(state);
        console.log(prevState);
        console.log('~~~~~~~~~~~~~~~~~~~~')
    }, [])

    // ComponentDidUpdate
    useEffect(() => {
        if(validateStateDiff(state, prevState)){
            console.log("State changing");
            console.log(state);
            console.log(initialState);
            //setState({...initialState});
        }

    }, [{...state}, {...prevState}])

    // TODO: Add 'esc' key to blur whole form
    // console.log(`~~~~~~~~~~~`);
    // console.log(`${id}`);
    // console.log(`~~~~~~~~~~~`);
    // console.log(state);
    // console.log(`~~~~~~~~~~~`);
    return (
        <CardContainerGrid>
            <Mutation 
                mutation={mutation}
            >
                {(mutationAction, { data }) => (
                    // Passes event to props submit
                    <form id={id} 
                        onSubmit={async e => {
                            e.preventDefault();
                            document.activeElement.blur() //Trigger blur for currently active element
                            //Check to see if there is a diff in state & prev state
                            const st = await validateStateDiff(state, prevState);
                            // if(st){
                                //setPrevState(state);

                            console.log("SUBMITTING STATE:");
                            console.log({id, ...state});
                            console.log(`~~~~~~~~~~~~`);
                            const { data } = await mutationAction({variables: {id, ...state}});
                            console.log("~~~~~~~~~~~~")
                            console.log(data);
                            console.log("~~~~~~~~~~~~")
                            if(data){

                                setState({
                                    title: "",
                                    author: "",
                                    date: "",
                                    description: ""
                                });

                                    // if(!clearOnSubmit){
                                    //     const {__typename, ...newState} = data[mutationName];
                                    //     setState({...newState});
                                    // } else {
                                    //     // Clears all state
                                        
                                    //     setPrevState(state);
                                    // }
                            //     } else {
                            //         console.log("Something went wrong!");
                            //     }
                                
                            // } 
                            // setEdited(false);
                        }}}>
                        {render({ state, expanded, edited, prevState, setState, setEdited, setExpanded, setPrevState })}
                    </form>
                )}
            </Mutation>
        </CardContainerGrid>
    )
}

export default FormCard;