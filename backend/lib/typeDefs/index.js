/**
 * THIS FILE IS GENERATED, DO NOT EDIT FORMAT
 * EDITING FORMAT MAY BREAK FURTHER SCAFFOLDING
 */
const { gql } = require('apollo-server-koa');

/* Query and Mutation Resolver TypeDefs */
const { userTypeDef, userQueries, userMutations } = require('./userTypeDefs')
const { spaceTypeDef, spaceQueries, spaceMutations } = require('./spaceTypeDefs');
const { cardTypeDef, cardQueries, cardMutations } = require('./cardTypeDefs');

module.exports = gql`
    
    """ TypeDefs for scalar types, left up to implementation """

    scalar Date

    """ TypeDefs User Defined Types """
    ${ userTypeDef }
    ${ spaceTypeDef }
    ${ cardTypeDef }

    type CardMeta {
        details: String
        questions: String
        notes: String
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
        ${ userQueries }
        ${ spaceQueries }
        ${ cardQueries }
    }

    type Mutation {
        ${ userMutations }
        ${ spaceMutations }
        ${ cardMutations }
    }
`;
