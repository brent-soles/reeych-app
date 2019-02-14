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
    userTypeDef:`
    type User {
        id: ID!
        belongsTo: ID!
        first: String!
        last: String!
        accessLvl: String!
        cards: [Card]
    }
    `,
    userQueries: `
        getUser(id: ID): User
        getUsers(id: ID): [User]
    `, // End cardQueries
    userMutations: `
        createUser(name: String): User
        updateUser(id: ID!, name: String!): User
        deleteUser(id: ID!): User
    ` // End cardMutations
}