---
to: lib/dao/models/<%= h.changeCase.pascalCase( model ) %>/<%= h.changeCase.camelCase( model ) %>Schema.js
unless_exists: true
---
const { Schema } = require('mongoose');

/* Schema Definition */
const <%= h.changeCase.camelCase( model ) %>SchemaDef = {
    // Define Schema here
}

module.exports = {
    <%= h.changeCase.camelCase( model ) %>Schema: new Schema(<%= h.changeCase.camelCase( model ) %>SchemaDef, { timestamps: true })
}