---
inject: true
to: lib/typeDefs/index.js
unless_exists: true
after: "type Query"
skip_if: "${ <%= h.changeCase.camelCase(model) %>Queries }"
---
<% if( locals.type === 'all' || locals.type === 'query' ) { -%>
        ${ <%= h.changeCase.camelCase(model) %>Queries }<% } -%>