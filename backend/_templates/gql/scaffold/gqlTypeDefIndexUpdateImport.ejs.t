---
inject: true
to: lib/typeDefs/index.js
after: "Query and Mutation Resolver TypeDefs"
skip_if: "const { <%= h.changeCase.camelCase(model) %>Queries, <%= h.changeCase.camelCase(model) %>Mutations } = require('./<%= h.changeCase.camelCase(model) %>TypeDefs');"
---
const { <%= h.changeCase.camelCase(model) %>TypeDef, <%= h.changeCase.camelCase(model) %>Queries, <%= h.changeCase.camelCase(model) %>Mutations } = require('./<%= h.changeCase.camelCase(model) %>TypeDefs');