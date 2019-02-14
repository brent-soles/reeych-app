---
inject: true
to: <% if( type === 'all' || type === 'query' ) { %>lib/resolvers/Queries/index.js<% } else { %><%= null %><% } %>
after: "module.exports"
skip_if: "    ...<%= h.changeCase.camelCase(model) %>Queries,"
---
    ...<%= h.changeCase.camelCase(model) %>Queries,