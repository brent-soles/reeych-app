---
to: lib/resolvers/index.js
unless_exists: true
---
// This file is auto-generated using: hygen gql init
//  Please do not change this file, as it is generated and scaffolding will break
// There should be no injection into this file, due to resolvers only needing:
// Querues and Mutations

// Resolver Imports:
const Queries = require('./Queries');
const Mutations = require('./Mutations');

// Resolver Exports:
// This is fed up to the server definition inside the root index.js
module.exports = {
    Query: Queries, // Must be passed to server as 'Query'
    Mutation: Mutations //// Must be passed to server as 'Mutation'
}