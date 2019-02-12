const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isJesting = process.env.JWT_SALT ? false : true; // Determines if testing or not
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
        new Schema({ 
            email: { type: String, required: true, unique: true, match: /([a-zA-z]|(\.|\-|\_))+\@[a-zA-z]+\.(com|net|org)$/ }, verified: { type: Boolean, default: false } 
        }, { _id: false })
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
        expires: {type: Number, required: true},
        expired: { type: Boolean, required: true } 
    }
}

/************ Helper Functions ***************/

async function hashPasswd(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 12, (err, hash) => {
            if(err) reject(err);
            resolve(hash);
        })
    })
}

const _MinutesFromNow = (numOfMinutes) => {
    return Math.floor(Date.now() / 1000) + 60 * numOfMinutes;
}

/**
 * Mongoose User docuemt middlewares
 */
const UsersSchema = new Schema(usersSchema, { timestamps: true });

// Hashes password, and replaces it on submission
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
}

/**
 * Registers a new user to the system then they can do any/all of the following:
 *  1. Create a space/organization
 *  2. Join a space
 *  3. Browse public (or if a member of a private one) space
 * 
 * Returns a signed/valid JWT to attach to user cookie
 * params:
 *  {*} userRegistrationData: object with user details about who is being created
 *          defaults shoule be to only have username/passwd 
 */
UsersDAO.prototype.registerUser = async function(userRegistrationData) {
    // Filters emails
    try {
        const { first, last, email, password } = userRegistrationData; // gets necessary form data
        // Initial Token creation
        const expiration = _MinutesFromNow(30); // Sets the token to expire in 30 minutes
        const initToken = jwt.sign({ 
            name: `${first} ${last}`,
            email,
            memberships: [],
            exp: expiration
        }, isJesting ? 'jestTest' : process.env.JWT_SALT); //Signs token
        
        // Create the new user
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
            auth: {
                token: initToken,
                expires: expiration,
                expired: false
            }
        });
        await newUser.save();
        return initToken;
    } catch(err) {
        throw new Error(`Error creating user`); // Bubbles up to resolver
    }
}

/**
 * Function returns a valid JWT, after saving it to the most recent token used
 * 
 */
UsersDAO.prototype.loginUser = async function(userLoginData){
    try {
        const { email, password } = userLoginData; // Should only have these two fields
        
        // Grabs user data based off of subdocument email
        const user = await this.schema.findOne({ 
            emails: {
                $elemMatch: {
                    email: email
                }
            }
        });

        // Password validation
        // if valid => create new token & update user model with new token 
        // Otherwise throw an authentication error
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword){
            const newToken = jwt.sign({ 
                name: `${user.name.first} ${user.name.last}`,
                email,
                memberships: user.memberships,
                exp: _MinutesFromNow(30)
            }, isJesting ? 'jestTest' : process.env.JWT_SALT);

            // Updates User to have new token for further calls
            const udpatedUser = await this.schema.findOneAndUpdate({ _id: user._id }, {
                auth: {
                    token: newToken,
                    expires: _MinutesFromNow(30),
                    expired: false
                }
            }, {
                new: true,
                runValidators: true
            });
            return newToken;
        }

        throw new Error('User has wrong credentials');
    } catch(err) {
        throw new Error(`Error authenticating user`);
    }
}

module.exports = {
    UsersDAO: new UsersDAO()
}