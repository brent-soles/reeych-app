import React, { useState } from 'react';
import { Query } from 'react-apollo';

/**
 * Import user components
 */
import { CardContainerLayout, 
    CardLayout, 
    H1Input, 
    H2Input, 
    Row, 
    H2Select,
    Textarea
} from '../general/Styles';
import { DeleteButton } from '../general/Buttons';
import FormCard from '../FormCard/FormCard';
import SingleCardDelete from './SingleCardDelete';
import { ALL_CARDS, UPDATE_CARD } from './GraphQLOperations';


const CardBoardQuery = ({ spaceId }) => {
    return(
    <CardContainerLayout>
        <Query query={ALL_CARDS} variables={{id: spaceId}} pollInterval={500}>    
            {({ data, loading, error }) => {
                if (loading) return <h1>Loading...</h1>
                if (error) return <h1>{error}</h1>
                
                const { cards } = data;

                return cards.map((card, index) => {
                    const {id, ...restProps} = card;
                    return (
                        <CardLayout key={index}>
                            <FormCard 
                                id={id}
                                mutation={UPDATE_CARD} 
                                mutationName={"updateCard"}
                                initialState={restProps}
                                render={({state, setState}) => (
                                        <>
                                            <Row row={1} >
                                                <H1Input 
                                                    value={state.title}
                                                    onChange={e => setState({...state, title: e.target.value})}
                                                />
                                            </Row>
                                            <Row row={2} >
                                                <H2Select 
                                                    value={state.author}
                                                    onChange={e => setState({...state, author: e.target.value})}
                                                >
                                                    <option value="author 1">author 1</option>
                                                    <option value="author 2">author 2</option>
                                                    <option value="author 3">author 3</option>
                                                </H2Select>
                                            </Row>
                                            <Row row={3}>
                                                <Textarea 
                                                    value={state.description}
                                                    onChange={e => setState({...state, description: e.target.value})}
                                                />
                                                <SingleCardDelete render={({ deleteCard }) => {
                                                    return <DeleteButton onClick={()=> deleteCard({variables: {id}})}>Delete</DeleteButton>
                                                }}/>
                                                <input type="submit" />
                                            </Row>
                                        </>
                                    )
                                }
                            />
                        </CardLayout>
                    )
                })
            }}
        </Query>
    </CardContainerLayout>
    );
}

export default CardBoardQuery;