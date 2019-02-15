---
inject: true
to: lib/dao/models/index.js
after: "DAO Access Objects"
skip_if: "const { <%= h.changeCase.pascalCase( model ) %>DAO } = require('./<%= h.changeCase.pascalCase( model ) %>');"
---
const { <%= h.changeCase.pascalCase( model ) %>DAO } = require('./<%= h.changeCase.pascalCase( model ) %>/<%= h.changeCase.camelCase( model ) %>Model');