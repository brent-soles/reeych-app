---
to: lib/dao/models/<%= h.changeCase.pascalCase( model ) %>/<%= h.changeCase.camelCase( model ) %>Model.js
unless_exists: true
---
// Basic Imports
const { model } = require('mongoose');
const { <%= h.changeCase.camelCase( model ) %>Schema } = require('./<%= h.changeCase.camelCase( model ) %>Schema')


/* DAO Class Definition */
function <%= h.changeCase.pascalCase( model ) %>DAO() {
    this.schema = model('<%= h.changeCase.pascalCase( model ) %>', <%= h.changeCase.camelCase( model ) %>Schema);
}


/* Operation Definitions */
<%= h.changeCase.pascalCase( model ) %>DAO.prototype.get = async function( args ) {

}

<%= h.changeCase.pascalCase( model ) %>DAO.prototype.create = async function( args ) {

}

<%= h.changeCase.pascalCase( model ) %>DAO.prototype.update = async function( args ) {

}

<%= h.changeCase.pascalCase( model ) %>DAO.prototype.delete = async function( args ){

}

module.exports = {
    <%= h.changeCase.pascalCase( model ) %>DAO: new <%= h.changeCase.pascalCase( model ) %>DAO()
}