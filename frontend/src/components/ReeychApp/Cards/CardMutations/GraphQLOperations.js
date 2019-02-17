import gql from 'graphql-tag';

export const ALL_CARDS = gql`
    query getCards($id: ID!){
        cards(id: $id){
            id,
            title,
            author,
            description,
            lastModified
        }
    }
`;

export const CREATE_CARD = gql`
    mutation CreateCard($id: ID!, $title: String!, $author: String!, $description: String!){
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
    mutation UpdateCard($id: ID!, $title: String, $author: String, $description: String){
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
    mutation DeleteCard($id: ID!){
        deleteCard(id: $id){
            id
        }
    }
`;