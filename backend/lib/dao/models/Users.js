const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const permLevels = require('../../constants/access');

/**
 * 
 */

const usersSchema = {
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        full: {type: String, required: false}
    },
    emails:[ 
        { type: String, required: true, unique: true }
    ],
    password: { type: String, required: true },
    memberships: [ 
        {
            spaceId: { type: Schema.Types.ObjectId, required: true },
            spaceName: {type: String, required: true, unique: true},
            accessLvl: { type: Number, required: true }
        }
    ],
    cards: [
        { cardId: Schema.Types.ObjectId, posted: Boolean }
    ],
    auth: { 
        token: { type: String, required: true, unique: true },
        expired: { type: Boolean, required: true } 
    }
}


async function hashPasswd(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) reject(err);
            resolve(hash);
        })
    })
}

/**
 * Mongoose User docuemt middlewares
 */
const UsersSchema = new Schema(usersSchema, { timestamps: true });

UsersSchema.pre('save', async function(next) {
    let user = this;
    user.password = await hashPasswd(user.password);
    next();
})


/**
 * Definition of User Data Access Object
 * Will have wrappers for the each CRUD necessary
 * This model is used to abstract data access away from endpoints.
 * 
 * This is ideal, as it provides a way to easily move this functionality
 * to a Microservice w/ any other backend
 */
function UsersDAO() {
    this.schema = model('Users', UsersSchema);
    this.saltRounds = 18;
}

/**
 * Registers a new user to the system then they can do any/all of the following:
 *  1. Create a space/organization
 *  2. Join a space
 *  3. Browse public (or if a member of a private one) space
 * 
 * params:
 *  {*} userToCreate: object with user details about who is being created
 *          defaults shoule be to only have username/passwd 
 */
UsersDAO.prototype.registerUser = async function(userToCreate, ctx) {
    try {
        const { first, last, email, password } = userToCreate; // gets necessary form data
        const newUser = new this.schema({
            name: {
                first,
                last,
                full: `${first} ${last}`
            },
            emails: [
                { email, verified: false }
            ],
            password, // This value gets hashed and replaced upon save
            memberships: [],
            cards: [],
            token: {
                token: ,
                expired: false
            }
        });
        await newUser.save();
        return newUser
    } catch(err){
        console.log(err)
        throw new Error(`Error creating user`); // Bubbles up to resolver
    }
}

UsersDAO.prototype.

// udao = new UsersDAO();
// udao.registerUser({
//     first: 'Brent',
//     last: 'Soles',
//     email: 'Its@email.com',
//     password: 'hello',
//     belongsTo: '1',
//     accessLvl: 'admin'
// })

module.exports = {
    UsersDAO: new UsersDAO()
}