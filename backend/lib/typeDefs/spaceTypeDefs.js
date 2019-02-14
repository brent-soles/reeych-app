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
    spaceTypeDef:`
    type Space {
        id: ID!
        name: String!
        numCards: Int
        createdAt: Date!
        lastModified: Date!
        permissionLevels: String
        cards: [ID]
    }
    `,
    spaceQueries: `
        getSpace(id: ID): Space
        getSpaces(id: ID): [Space]
    `, // End cardQueries
    spaceMutations: `
        createSpace(name: String): Space
        updateSpace(spaceId: ID!, name: String!): Space
        deleteSpace(spaceId: ID!): Space
        addSpaceUser(first: String!, last:String!, email: String!, accessLvl: String): User
    ` // End cardMutations
}