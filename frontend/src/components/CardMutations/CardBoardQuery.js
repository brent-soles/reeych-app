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

    const [allCards, setAllCards] = useState([]);

    const removeElementFromList = (index) => {
        if(index < 0 || index >= allCards.length){
            throw `Out of bounds`;
        }

        setAllCards(prevState =>
            prevState.filter((_, i) => i !== index)
        ); // Returns true for only those 
    }

    return(
    <CardContainerLayout>
        <Query query={ALL_CARDS} variables={{id: spaceId}} pollInterval={500}>    
            {({ data, client, loading, error }) => {
                if (loading) return <h1>Loading...</h1>
                if (error) return <h1>{error}</h1>
                
                const { cards } = data;
                //console.log(cards);
                console.log("REPAINT");
                return cards.map((card, index) => {
                    const {id, ...restProps} = card;
                    //console.log(restProps);
                    return (
                        <CardLayout key={index}>
                            <Row row={1} >
                                <h1>{restProps.title}</h1>
                            </Row>
                            <Row row={2} >
                                <h1>{restProps.author}</h1>
                                <h1>{restProps.lastModified}</h1>
                                <h1>{restProps.createdAt}</h1>
                            </Row>
                            <Row row={3}>
                                <h1>{restProps.description}</h1>
                                <SingleCardDelete render={({ deleteCard }) => {
                                    return <button onClick={()=> deleteCard({variables: {id}})}>Delete</button>
                                }}/>
                            </Row>
                            
                            {/* <FormCard 
                                id={id}
                                mutation={UPDATE_CARD} 
                                mutationName={"updateCard"}
                                initialState={restProps}
                                render={({state, setState}) => {
                                    
                                    return (
                                        <>
                                            <Row row={1} >
                                                <H1Input 
                                                    value={state.title}
                                                    onChange={e => setState({...state, title: e.target.value})}
                                                />
                                            </Row>
                                            <Row row={2} >
                                                <H1Input 
                                                    value={state.author}
                                                    onChange={e => setState({...state, author: e.target.value})}
                                                />
                                            </Row>
                                        </>
                                    )
                                }}
                            /> */}
                        </CardLayout>
                    )
                })
            }}
        </Query>
    </CardContainerLayout>
    );
}

export default CardBoardQuery;