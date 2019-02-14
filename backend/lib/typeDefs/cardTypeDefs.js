/** This file is auto generated upon scaffold
 * you may edit the template string, but please do not edit pre-existing formatting
 *
 * to add via script: hygen gql addTypeDef --type [query|mutation|all] --model <model>
 *
 * Before running your server, you need to define inputs and outputs each of these typedefs
 *
 * This file makes some assumpations about the types returned from these resolvers, which in this case
 * is the model name you specified. 
 */
module.exports = {
    cardTypeDef:`
    type Card {
        id: ID!
        spaceId: ID!
        title: String!
        author: String!
        description: String!
        meta: CardMeta
        createdAt: Date!
        lastModified: Date!
        dateToSend: Date
    }
    `,
    cardQueries: `
        getCard(id: ID!, spaceId: ID): Card
        getCards(id: ID!): [Card]
    `, // End cardQueries
    cardMutations: `
        createCard(spaceId: ID!, title: String!, author: String!, description: String!, meta: CardMetaData): Card
        updateCard(cardId: ID!, title: String, author: String, description: String, meta: CardMetaData): Card
        deleteCard(cardId: ID!): Card
    ` // End cardMutations
}