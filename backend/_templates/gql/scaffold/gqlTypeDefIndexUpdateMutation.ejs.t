---
inject: true
to: lib/typeDefs/index.js
unless_exists: true
after: "type Mutation"
skip_if: "${ <%= h.changeCase.camelCase(model) %>Mutations }"
---
<% if( locals.type === 'all' || locals.type === 'mutation' ) { -%>
        ${ <%= h.changeCase.camelCase(model) %>Mutations }<% } -%>