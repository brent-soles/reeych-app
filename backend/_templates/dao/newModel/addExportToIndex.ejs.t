---
inject: true
to: lib/dao/models/index.js
after: "models"
skip_if: "name: '<%= h.changeCase.pascalCase( model ) %>'"
---
        {
            name: '<%= h.changeCase.pascalCase( model ) %>',
            daoObj: <%= h.changeCase.pascalCase( model ) %>DAO
        },