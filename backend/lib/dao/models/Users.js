const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const permLevels = require('../../constants/access');

/**
 * At a high level, users can only adminster one space,
 * Once space being 
 */

const belongsToSchema = new Schema({
    space: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accessLvl: {
        type: String,
        required: true
    }
});

const usersSchema = {
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    belongsTo: [belongsToSchema],
    // accessLvl: { type: String, required: true }, Don't need, but will keep for now
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    cards: [Schema.Types.ObjectId]
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
const UsersSchema = new Schema(usersSchema);
UsersSchema.pre('save', async function(next) {
    let user = this;
    console.log(user.password);
    user.password = await hashPasswd(user.password);
    console.log(user.password);
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
    //this.schema = ;
    this.schema = model('Users', UsersSchema);
    this.saltRounds = 10;
}

UsersDAO.prototype.registerUser = async function(userToCreate) {
    try {
        //const {first, last, email, password, belongsTo, accessLvl } = userToCreate;
        const newUser = new this.schema({...userToCreate});
        await newUser.save();
        return newUser

    } catch(err){
        console.log(err)
        throw new Error(`Error creating user`); // Bubbles up to resolver
    }
}

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