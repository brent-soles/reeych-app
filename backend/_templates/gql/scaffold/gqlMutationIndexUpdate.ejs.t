---
inject: true
to: <% if( type === 'all' || type === 'mutation' ) { %>lib/resolvers/Mutations/index.js<% } else { %><%= null %><% } %>
after: "Resolver Imports"
skip_if: "const <%= h.changeCase.camelCase(model) %>Mutations"
---
const <%= h.changeCase.camelCase(model) %>Mutations = require('./<%= h.changeCase.camelCase(model) %>Mutations');