const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
const { UsersDAO } = require('../models/Users');

describe('User should be returned from save call', () => {
    it('should return newly created user', () => {
        const objId = mongoose.Types.ObjectId();
        const _user = {
            _id: objId,
            first: "Brent",
            last: 'Soles',
            email: 'junk@mail.com',
            password: 'testing1234_56789',
            belongsTo: [
                {
                    space: objId,
                    accessLvl: "SPACE_ADMIN" // I realize this is now redundant
                }
            ],
            cards: [objId]
        }

        mockingoose.Users.toReturn(_user, 'findOne')
        // Need to complete
    })
})

describe('User should have hashed password', () => {
    it('should return with hash in place of original', () => {
        const objId = mongoose.Types.ObjectId();
        const _user = {
            first: "Brent",
            last: 'Soles',
            email: 'junk@mail.com',
            password: 'testing1234_56789',
            belongsTo: [
                {
                    space: objId,
                    accessLvl: "SPACE_ADMIN" // I realize this is now redundant
                }
            ],
            cards: [objId]
        }

        mockingoose.Users.toReturn(_user, 'save');
        return UsersDAO.registerUser({
            first: "Brent",
            last: 'Soles',
            email: 'junk@mail.com',
            password: 'testing1234_56789',
            belongsTo: [
                {
                    space: objId,
                    accessLvl: "SPACE_ADMIN" // I realize this is now redundant
                }
            ],
            cards: [objId]
        }).then( (result) => {
            expect(result.password).not.toMatch(_user.password)
        })
    })
})

