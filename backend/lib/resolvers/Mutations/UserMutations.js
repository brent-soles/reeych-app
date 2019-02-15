/**
 * File holding all of the GraphQL resolvers for User database
 */

// Password hash validation
const bcrypt = require('bcrypt');

// Token validation
const jwt = require('jsonwebtoken');


/**
 * Grabs form data to register a user
 * No token validation needed, as someone will not have a token upon registering
 * 
 * This will attach a valid access token to the request context 
 * @param {*} _ => parent 
 * @param {*} args => data parameters
 * @param {*} { dao } => data access object. This destructs from the ctx object
 * @param {*} info 
 */
const createUser = async (_, args, { dao, cookies }, info) => {
    const { User } = dao;
    try{
        const userToken = await User.create(args);
        cookies.set('reeych', userToken, { httpOnly: false });
        return {
            code: 200,
            message: "Success"
        }
    } catch(err){
        return {
            code: -1,
            message: "Fail"
        }
    }
}

/**
 * Checks provided information to login a user
 * 
 * @param {*} _ => parent 
 * @param {*} args => data parameters
 * @param {*} { dao } => data access object 
 * @param {*} info  
 */
const loginUser = async (_, args, { dao, cookies }, info ) => {
    try {
        const { User } = dao;
        const userToken = await User.login(args);
        cookies.set('reeych', userToken, { httpOnly: false });
        return {
            code: 200,
            message: "Success"
        }
    } catch (err) {
        return {
            code: -1,
            message: "Fail"
        }
    }
}

module.exports = {
    createUser,
    loginUser
}