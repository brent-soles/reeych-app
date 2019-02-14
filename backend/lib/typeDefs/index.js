/**
 * THIS FILE IS GENERATED, DO NOT EDIT FORMAT
 * EDITING FORMAT MAY BREAK FURTHER SCAFFOLDING
 */
const { gql } = require('apollo-server-koa');

/* Query and Mutation Resolver TypeDefs */
const { cardTypeDef, cardQueries, cardMutations } = require('./cardTypeDefs');

module.exports = gql`
    
    """ TypeDefs for scalar types, left up to implementation """

    scalar Date

    """ TypeDefs User Defined Types """

    type User {
        id: ID!
        belongsTo: ID!
        first: String!
        last: String!
        accessLvl: String!
        cards: [Card]
    }

    ${ cardTypeDef }

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

    """ Unique input types """

    input CardMetaData {
        details: String
        questions: String
        notes: String
    }

    input Permission {
        level: String!
    }
    
    """ CRUD Types """

    type Query {
        getSpace(id: ID): Space
        getSpaces(id: ID): [Space]
        getUser(id: ID): User
        getUsers(ids: [ID]): [User]
        ${ cardQueries }
    }

    type Mutation {
        createSpace(name: String): Space
        updateSpace(spaceId: ID!, name: String!): Space
        deleteSpace(spaceId: ID!): Space
        addSpaceUser(first: String!, last:String!, email: String!, accessLvl: String): User
        ${ cardMutations }
    }
`;
