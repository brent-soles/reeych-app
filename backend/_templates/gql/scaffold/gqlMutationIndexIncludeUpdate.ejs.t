---
inject: true
to: <% if( type === 'all' || type === 'mutation' ) { %>lib/resolvers/Mutations/index.js<% } else { %><%= null %><% } %>
skip_if: <%= model %>Mutations
after: \{
---
    ...<%= model %>Mutations,