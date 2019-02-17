
// Query resolvers for model: space

/** Returns a single object from space
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx) 
 * @param {*} info 
 */
const getSpace = async (_, args, ctx, info) => {
    const { Space } = ctx.dao;
    try{
        let space = await Space.get(args);
        return space;
    } catch(err) {
        console.log(err)
    }
    return null;
}

/** Returns multiple objects from space
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx)
 * @param {*} info 
 */
const getSpaces = async (_, args, ctx, info) => {
    try {
        // Add resolver logic here
        return null;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    getSpace,
    getSpaces
}