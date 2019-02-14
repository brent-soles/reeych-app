---
to: lib/typeDefs/<%= h.changeCase.camelCase(model) %>TypeDefs.js
unless_exists: true
---
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
    <%= h.changeCase.camelCase(model) %>TypeDef: `
    type <%= h.changeCase.pascalCase(model) %> {
        id: ID
    }
    `,
    <%= h.changeCase.camelCase(model) %>Queries: `
<% if( locals.type === 'all' || locals.type === 'query' ) { -%>
        get<%= h.changeCase.pascalCase(model) %>(id: ID!): <%= h.changeCase.pascalCase(model) %>
        get<%= h.changeCase.pascalCase(model) %>s(id: ID!): [<%= h.changeCase.pascalCase(model) %>]
<% } -%>
    `, // End cardQueries
    <%= h.changeCase.camelCase(model) %>Mutations: `
<% if( locals.type === 'all' || locals.type === 'mutation' ) { -%>
        create<%= h.changeCase.pascalCase(model) %>(id: ID!): <%= h.changeCase.pascalCase(model) %>
        update<%= h.changeCase.pascalCase(model) %>(id: ID!): <%= h.changeCase.pascalCase(model) %>
        delete<%= h.changeCase.pascalCase(model) %>(id: ID!): <%= h.changeCase.pascalCase(model) %>
<% } -%>
    `// End cardMutations
}