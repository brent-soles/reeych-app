import React from 'react';

/**
 * Import user components
 */
import { CardContainerLayout, 
    CardLayout, 
    H1Input, 
    H2Input, 
    Row, 
    Column, 
    H2Select,
    Textarea
} from '../general/Styles';
import FormCard from '../FormCard/FormCard';
import { CREATE_CARD } from './GraphQLOperations';

const authors = ['brent', 'aidan', 'zee zee'];


// Could possibly use setState on init paint, and then modify
// TODO: ^^^
const SingleCardCreate = ({ spaceId }) => (


    <FormCard
        id={spaceId}
        mutation={CREATE_CARD}
        mutationName={"createCard"}
        clearOnSubmit={true}
        render={({ state, edited, prevState, setState, setEdited, setPrevState })=> (
            <CardLayout>
                <Row row={1}>
                    <H1Input 
                        id={`title-`} 
                        type="text" 
                        value={state.title ? state.title : ""} 
                        onChange={(e) => {
                            setState({
                                ...state,
                                title: e.target.value
                            });
                            setEdited(true);
                        }}
                        onBlur={(e) => setState({...state, title: e.target.value})}    
                    />
                    {edited && <input type="submit"></input>}
                </Row>
                <Row row={2}>
                        <input type="date" value={state.date ? state.date : authors[0]} onChange={(e) => setState({...state, date: e.target.value})} />
                        <select value={state.author} onChange={(e) => setState({...state, author: e.target.value})} >
                            {authors.map((authr) => {

                                return <option value={authr}>{authr}</option>
                            })}
                        </select>
                </Row>
                <Row row={3}>
                    <Textarea
                            id={`title-${spaceId}`} 
                            type="text" 
                            value={state.description ? state.description : ""} 
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    description: e.target.value
                                });
                                setEdited(true);
                            }}
                            onBlur={(e) => setState({...state, description: e.target.value})}    
                        />
                </Row>
            </CardLayout>
        )}
    />
)

export default SingleCardCreate;