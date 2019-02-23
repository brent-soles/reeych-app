// Basic Imports
const { model } = require('mongoose');
const { userSchema } = require('./userSchema');

/* Additional Imports */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isJesting = process.env.JWT_SALT ? false : true; // Determines if testing or not

/* Helper Functions */

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


/* User Middlewares */

userSchema.pre('save', async function(next) {
    let user = this;
    user.password = await hashPasswd(user.password);
    
    next();
})

/* DAO Class Definition */

function UserDAO() {
    this.schema = model('User', userSchema);
}


/* Operations Definitions */

UserDAO.prototype.get = async function( args ) {

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
UserDAO.prototype.create = async function( args ) {
    // Filters emails
    try {
        const { first, last, email, password } = args; // gets necessary form data
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

UserDAO.prototype.update = async function( args ) {

}

UserDAO.prototype.delete = async function( args ){

}


/* Additional Functions */

/**
 * Function returns a valid JWT, after saving it to the most recent token used
 * 
 */
UserDAO.prototype.login = async function( args ){
    try {
        const { email, password } = args; // Should only have these two fields
        
        // Grabs user data based off of subdocument email
        const user = await this.schema.findOne({ 
            emails: {
                $elemMatch: {
                    email: email
                }
            }
        });
        if( !user ) {
            throw new Error(`User Returned null`)
        }

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

        throw new Error(`Error Authenticating User`);
    } catch(err) {
        throw err;
    }
}


module.exports = {
    UserDAO: new UserDAO()
}