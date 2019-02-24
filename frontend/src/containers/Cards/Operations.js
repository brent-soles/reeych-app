import gql from 'graphql-tag';

export const ALL_CARDS = gql`
    query getCards($id: ID!){
        getCards(id: $id){
            id,
            title,
            author,
            description,
            lastModified
        }
    }
`;

export const GET_CARD = gql`
    query getCard($id: ID!, $space: String){
        getCard(id: $id, spaceId: "5c672e823aedb67d4580e10a"){
            id,
            title,
            author,
            description
        }
    }
`;


export const CREATE_CARD = gql`
    mutation createCard($id: ID!, $title: String!, $author: String!, $description: String!){
        createCard(belongsTo: $id, title: $title, author: $author, description: $description){
            id,
            title,
            author,
            createdAt,
            description
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation updateCard($id: ID!, $title: String, $author: String, $description: String){
        updateCard(id: $id, title: $title, author: $author, description: $description){
            id,
            title,
            author,
            createdAt,
            lastModified,
            description
        }
    }
`;

export const DELETE_CARD = gql`
    mutation deleteCard($id: ID!){
        deleteCard(id: $id){
            id
        }
    }
`;