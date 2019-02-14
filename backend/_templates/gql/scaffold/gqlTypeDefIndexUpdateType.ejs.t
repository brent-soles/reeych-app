---
inject: true
to: lib/typeDefs/index.js
unless_exists: true
after: "TypeDefs User Defined Types"
skip_if: "type <%= model %>"
---
    ${ <%= h.changeCase.camelCase(model) %>TypeDef }