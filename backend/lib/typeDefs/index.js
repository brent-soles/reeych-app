const { gql } = require('apollo-server-koa');

module.exports = gql`
    type Query {
        cards: [Card],
        card(id: ID, spaceId: ID): Card,
        space(id: ID): Space,
        spaces: [Space]
    }

    type Mutation {
        space(id: ID, name: String): Space,
        card(id: ID!, title: String, author: String, description: String): Card
    }

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
        belongsTo: ID!
        details: String
        questions: String
        notes: String
    }

    type Space {
        id: ID!,
        space: String,
        numCards: Int,
        spaceCards: [Card]
    }

`;