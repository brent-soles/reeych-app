---
inject: true
to: <% if( type === 'all' || type === 'mutation' ) { %>lib/resolvers/Mutations/index.js<% } else { %><%= null %><% } %>
skip_if: const <%= model %>Mutations
at_line: 0
---
const <%= model %>Mutations = require('./<%= model %>Mutations');