---
inject: true
to: <% if( type === 'all' || type === 'query' ) { %>lib/resolvers/Queries/index.js<% } else { %><%= null %><% } %>
after: "Resolver Imports"
skip_if: "const <%= model %>Queries"
---
const <%= h.changeCase.camelCase(model) %>Queries = require('./<%= h.changeCase.camelCase(model) %>Queries');