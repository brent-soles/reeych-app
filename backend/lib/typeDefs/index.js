const { gql } = require('apollo-server-koa');

module.exports = gql`
    
    """
        TypeDefs for unique/composite types
        
    """
    type Card {
        id: ID!
        belongsTo: ID!
        title: String!
        author: String!
        description: String!
        meta: CardMeta
    }

    type CardMeta {
        details: String
        questions: String
        notes: String
    }

    type Space {
        id: ID!,
        name: String,
        numCards: Int,
        cards: [ID]
    }

    """
        Unique input types
    """
    input CardMetaData {
        details: String
        questions: String
        notes: String
    }
    
    """
        CRUD Types
    """

    type Query {
        cards(id: ID!): [Card]
        card(id: ID!, spaceId: ID): Card
        space(id: ID): Space
        spaces: [Space]
    }

    type Mutation {
        createSpace(name: String): Space
        updateSpace(id: ID!, name: String!): Space
        deleteSpace(id: ID!): Space
        createCard(belongsTo: ID!, title: String!, author: String!, description: String!, meta: CardMetaData): Card
        updateCard(id: ID!, title: String, author: String, description: String, meta: CardMetaData): Card
        deleteCard(id: ID!): Card
    }

    

`;