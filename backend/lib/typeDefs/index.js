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
        getCards(id: ID!): [Card]
        getCard(id: ID!, spaceId: ID): Card
        getSpace(id: ID): Space
        getSpaces(id: ID): [Space]
        getUser(id: ID): User
        getUsers(ids: [ID]): [User]
    }

    type Mutation {
        createSpace(name: String): Space
        updateSpace(spaceId: ID!, name: String!): Space
        deleteSpace(spaceId: ID!): Space
        addSpaceUser(first: String!, last:String!, email: String!, accessLvl: String): User
        createCard(spaceId: ID!, title: String!, author: String!, description: String!, meta: CardMetaData): Card
        updateCard(cardId: ID!, title: String, author: String, description: String, meta: CardMetaData): Card
        deleteCard(cardId: ID!): Card
    }
`;