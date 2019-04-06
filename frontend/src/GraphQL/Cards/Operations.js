import gql from 'graphql-tag';

export const ALL_CARDS = gql`
  input GetCardInput {
    spaceId: ID!
    cardId: ID!
  }

  query getCards($input: GetCardInput!){
    getCards(input: $input){
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
        getCard(input: $input){
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