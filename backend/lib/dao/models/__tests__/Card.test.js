const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
require('dotenv').config({path: '../../../dev.server.env'});
const { CardDAO } = require('../Card/cardModel');

/*************** TESTS ***************/
describe('Initial test', () => {
    it('Runs without crashing', () => {
        expect(true).toEqual(true);
    })
})