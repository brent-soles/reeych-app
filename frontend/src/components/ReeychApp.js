import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';


/**
 * Import user components
 */
import { CardContainerLayout, CardLayout } from './general/Styles';
import FullCard from './Card';

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
    
    const [state, setState] = useState({
        
    })

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
                                return <FullCard key={index} {...card} />
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