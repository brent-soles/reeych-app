import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';


/**
 * Import user components
 */
import { CardContainerLayout, CardLayout, H1Input } from './general/Styles';
import FormCard from './CardForms/FormCard';

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
    // background-color: rgba(168, 246, 209, 1);
    background-color: rgba(0, 184, 158, 1);
    position: absolute;

`;


const ReeychApp = (props) => {
    const { spaceId } = props;
    const ALL_CARDS = gql`
        query getCards($id: ID!){
            cards(id: $id){
                id,
                title,
                author,
                description,
                meta {
                    details,
                    questions,
                    notes
                }
            }
        }
    `;

    const UPDATE_CARD = gql`
    mutation UpdateCard($id: ID!, $title: String!, $author: String!, $description: String!){
        cards(id: $id){
            id,
            title,
            author,
            description
        }
    }
`;

    return (
        <MainDiv>
            <Query query={ALL_CARDS} variables={{id: spaceId}}>    
                {({ data, loading, error }) => {
                    if (loading) return <h1>Loading...</h1>
                    if (error) return <h1>{error}</h1>
                    const { cards } = data;
                    console.log(cards);
                    return ( 
                        <CardContainerLayout>
                        {    cards.map((card, index) => {
                                const { id, ...restProps} = card;

                                return (
                                    <FormCard
                                        id={`formCard-${id}`}
                                        key={index}
                                        initialState={restProps}
                                        update={UPDATE_CARD}
                                        render={({ state, edited, prevState, setState, setEdited, setPrevState })=> (
                                            <CardLayout>
                                                <H1Input 
                                                    id={`title-${id}`} 
                                                    type="text" 
                                                    value={state.title} 
                                                    onChange={(e) => setState({...state, title: e.target.value})}
                                                    onBlur={(e) => setState({...state, title: e.target.value})}    
                                                />
                                            </CardLayout>
                                        )}
                                    />
                                )
                            })
                        }
                        </CardContainerLayout>
                    )
                }}
            </Query>
        </MainDiv>
    )
}

export default ReeychApp;