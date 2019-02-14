---
inject: true
to: <% if( type === 'all' || type === 'mutation' ) { %>lib/resolvers/Mutations/index.js<% } else { %><%= null %><% } %>
after: "module.exports"
skip_if: "    ...<%= h.changeCase.camelCase(model) %>Mutations,"
---
    ...<%= h.changeCase.camelCase(model) %>Mutations,