---
to: lib/dao/models/__tests__/<%= h.changeCase.pascalCase( model ) %>.test.js
unless_exists: true
---
const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
require('dotenv').config({path: '../../../dev.server.env'});
const { <%= h.changeCase.pascalCase( model ) %>DAO } = require('../<%= h.changeCase.pascalCase( model ) %>/<%= h.changeCase.camelCase( model ) %>Model');

/*************** TESTS ***************/
describe('Initial test', () => {
    it('Runs without crashing', () => {
        expect(true).toEqual(true);
    })
})