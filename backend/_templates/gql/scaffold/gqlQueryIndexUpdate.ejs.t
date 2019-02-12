---
inject: true
to: <% if( type === 'all' || type === 'query' ) { %>lib/resolvers/Queries/index.js<% } else { %><%= null %><% } %>
skip_if: cosnt <%= model %>Queries
at_line: 0
---
const <%= model %>Queries = require('./<%= model %>Queries');