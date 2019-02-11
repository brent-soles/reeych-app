const mongoose = require('mongoose');
const mockingoose = require('mockingoose').default;
require('dotenv').config({path: '../../../dev.server.env'})
const jwt = require('jsonwebtoken')
const { UsersDAO } = require('../models/Users');

/*************** Helper Functions ***************/

/**
 * Function transforms a Mongo ObjectId to next in sequence
 * ONLY for testing purposes
 * 
 * Returns: Incremented string version of Mongo ObjectId
 * example cases:
 * 
 *  Sequential Id Increment:
 *      "_id": "5c60a952d92c1a132a18e342"
 *              - to -
 *      "_id": "5c60a952d92c1a132a18e343",
 *
 *  Edge Id Increment:
 *      "_id": "5c60addb9030c3154ddd510f"
 *              - to -
 *      "_id": "5c60addb9030c3154ddd5110"
**/
// TODO: Make for all but last two (i.e. worst case for entire strength)
const _userIdGen = () => {
    let id = mongoose.Types.ObjectId().toString().split(''); // Splits the string into an array to operate on
    const lastCharCode = id[id.length - 1].charCodeAt(0); // MongoId last char character
    const secondToLastCode = id[id.length - 2].charCodeAt(0);
    // Base case: Next one will be increment in order
    if(String.fromCharCode(lastCharCode) === 'f') {
        // And second to last is '...ff'
        // Should go to '...00'
        if(String.fromCharCode(secondToLastCode) === 'f'){
            id[id.length - 2] = '0';
        } else {
            id[id.length - 2] = String.fromCharCode(lastCharCode + 1); // Next char code
        }
        id[id.length - 1] = '0';
    } else {
        id[id.length - 1] = String.fromCharCode(lastCharCode + 1);
    }
    return id.join('');
}

/*************** User Data definitions ***************/

const _validFormData = {
    first: 'Joe',
    last: 'Schmo',
    email: 'joe.schmo@genericemail.com',
    password: 'g3n3r1cp4ssw0rd'
}

const _invalidFormDataNoEmail = {
    first: 'Joe',
    last: 'Schmo',
    password: 'g3n3r1cp4ssw0rd'
}

const _invalidFormDataEmailFormat1 = {
    first: 'Joe',
    last: 'Schmo',
    email: 'joe.schmo@genericemail',
    password: 'g3n3r1cp4ssw0rd'
}

const _invalidFormDataEmailFormat2 = {
    first: 'Joe',
    last: 'Schmo',
    email: 'joe schmo@genericemail.net',
    password: 'g3n3r1cp4ssw0rd'
}

const expiration = Math.floor(Date.now() / 1000) + 60 * 30; // Sets the token to expire in 30 minutes
const initToken = jwt.sign({ 
    name: `${_validFormData.first} ${_validFormData.last}`,
    email: _validFormData.email,
    memberships: [],
    exp: expiration
}, 'jestTest');

const _usersSchemaReturnedOnCreate = {
    _id: _userIdGen(),
    name: {
        first: _validFormData.first,
        last: _validFormData.last,
        full: `${_validFormData.first} ${_validFormData.last}`
    },
    emails:[ 
        { email: _validFormData.email, verified: false }
    ],
    password: '$2a$12$RmGNKH00TxuEulx4kiZcKeA0EdicvNlFk6IzQOA2BYdMbnhg6nsi2',
    memberships: [],
    cards: [],
    auth: { 
        token: initToken,
        expires: expiration,
        expired: false 
    },
}

/*************** TESTS ***************/

// describe('User should have hashed password', () => {
    
// })

describe('User registration', () => {
    // First, check to see if a user registers
    it('Returns JWT, given valid form data', () => {
        mockingoose.Users.toReturn(_usersSchemaReturnedOnCreate, 'save');
        return UsersDAO.registerUser(_validFormData).then((result) => {
            expect(result).toEqual(initToken); // Checks to see if JWT is valid
        })
    })

    // Tests to see if validation is working
    it('Should throw validation error defined in User Schema with: Omission of email', async () => {
        mockingoose.Users.toReturn(_usersSchemaReturnedOnCreate, 'save');
        try {
            await UsersDAO.registerUser(_invalidFormDataNoEmail);
        } catch(err) {
            expect(err).toEqual(new Error(`Error creating user`));
        }
    })

    it('Should throw validation error defined in User Schema with: Wrong email format (no \.com)', async () => {
        mockingoose.Users.toReturn(_usersSchemaReturnedOnCreate, 'save');
        try {
            const newUserToken = await UsersDAO.registerUser(_invalidFormDataEmailFormat1);
            return newUserToken;
        } catch(err) {
            expect(err).toEqual(new Error(`Error creating user`));
        }
    })

    it('Should throw validation error defined in User Schema with: Wrong email format (space in email)', async () => {
        mockingoose.Users.toReturn(_usersSchemaReturnedOnCreate, 'save');
        try {
            await UsersDAO.registerUser(_invalidFormDataEmailFormat2);
        } catch(err) {
            expect(err).toEqual(new Error(`Error creating user`));
        }
    })
})

describe('User Login', () => {
    it('Returns JWT, given valid form data', async () => {
        mockingoose.Users
            .toReturn(_usersSchemaReturnedOnCreate, 'findOne')
            .toReturn(_usersSchemaReturnedOnCreate, 'findOneAndUpdate');

        return await UsersDAO.loginUser(_validFormData).then((result) => {
            const { email, exp, iat, memberships, name } = jwt.verify(result, 'jestTest');

            expect(email).toEqual(_validFormData.email);
            expect((exp - iat) / 60).toEqual(30);
            expect(exp).toBeGreaterThan(Math.floor(Date.now()) / 1000)
            expect(name).toEqual(`${_validFormData.first} ${_validFormData.last}`);
        })
    })

    it('Returns updated JWT, given valid form data', async () => {
        mockingoose.Users
            .toReturn(_usersSchemaReturnedOnCreate, 'findOne')
            .toReturn(_usersSchemaReturnedOnCreate, 'findOneAndUpdate');

        return await UsersDAO.loginUser(_validFormData).then((result) => {
            const { email, exp, iat, memberships, name } = jwt.verify(result, 'jestTest');
            const oldToken = jwt.decode(initToken, 'jestTest');
            
            // Make sure these are the same
            expect(email).toEqual(oldToken.email);
            expect(name).toEqual(oldToken.name);

            // Make sure these are greater than
            expect(exp).toBeGreaterThan(oldToken.exp);
            expect(iat).toBeGreaterThan(oldToken.iat);
        })
    })

    it('Throws error, given wrong credentials', async () => {
        mockingoose.Users.toReturn(_usersSchemaReturnedOnCreate, 'findOne');

        try {
            await UsersDAO.loginUser({ ..._validFormData, password: "wr0ngp4ssw0rd" });
        } catch (err) {
            expect(err).toEqual(new Error('Error authenticating user'))
        }
    })
})
