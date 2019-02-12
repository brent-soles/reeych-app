
// Query resolvers for model: user

/** Returns a single object from user
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} => request context (ctx) 
 * @param {*} info 
 */
const getUser = async (_, args, ctx, info) => {
    try{
        // Add resolver logic here
        return null;
    } catch(err) {
        console.log(err)
    }
    return null;
}

/** Returns multiple objects from user
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx)
 * @param {*} info 
 */
const getUsers = async (_, args, ctx, info) => {
    try {
        // Add resolver logic here
        return null;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    getUser,
    getUsers
}