const { gql } = require('apollo-server-koa');

module.exports = gql`
    scalar Date
    """
        TypeDefs for unique/composite types
        
    """

    type User {
        id: ID!
        belongsTo: ID!
        first: String!
        last: String!
        accessLvl: String!
        cards: [Card]
    }

    type Card {
        id: ID!
        belongsTo: ID!
        title: String!
        author: String!
        description: String!
        meta: CardMeta
        createdAt: Date!
        lastModified: Date!
        dateToSend: Date
    }

    type CardMeta {
        details: String
        questions: String
        notes: String
    }

    type Space {
        id: ID!
        name: String!
        numCards: Int
        createdAt: Date!
        lastModified: Date!
        permissionLevels: String
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

    input Permission {
        level: String!
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
        addSpaceUser(first: String!, last:String!, accessLvl: String): User
        createCard(belongsTo: ID!, title: String!, author: String!, description: String!, meta: CardMetaData): Card
        updateCard(id: ID!, title: String, author: String, description: String, meta: CardMetaData): Card
        deleteCard(id: ID!): Card
    }
`;