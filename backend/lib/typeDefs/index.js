const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Query {
        cards: [Card],
        card(id: ID, spaceId: ID): Card,
        space(id: ID): Space,
        spaces: [Space]
    }

    """
        TypeDefs for unique/composite types
    """
    type Card {
        id: ID!
        title: String!
        author: String!
        description: String!
        belongsTo: ID!
    }

    type Space {
        id: ID!,
        space: String,
        numCards: Int,
        spaceCards: [Card]
    }

`;