const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
require('dotenv').config({path: '../../../dev.server.env'});
const { SpaceDAO } = require('../Space/spaceModel');

/*************** TESTS ***************/
describe('Initial test', () => {
    it('Runs without crashing', () => {
        expect(true).toEqual(true);
    })
})