---
inject: true
to: <% if( type === 'all' || type === 'query' ) { %>lib/resolvers/Queries/index.js<% } else { %><%= null %><% } %>
skip_if: <%= model %>Queries
after: \{
---
    ...<%= model %>Queries,