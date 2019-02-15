/**
 * 
 * @param {*} _ 
 * @param {*} args => {
 *      name: String
 * }, only the name should be accept, everything else vanilla
 * @param {*} { dao }
 * @param {*} info 
 */
const createSpace = async (_, args, { dao }, info) => {
    const { Space } = dao; //grabs DAO from db ctx
    try{
        const space = await Space.create(args);
        return space;
    } catch(err) {
        console.log(`createSpace: ${err}`);
        if( err.error ){
            return err.error
        }
    }

}

/**
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} param2 
 * @param {*} info 
 */
const updateSpace = async (_, args, { dao }, info) => {
    const { Space } = dao;
    try {
        const space = Space.update(args);
        return space;
    } catch(err) {
        console.log(`updateSpace: ${err}`);
    }
}

/**
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} param2 
 * @param {*} info 
 */
const deleteSpace = async (_, args, { dao }, info) => {
    const { Space, Card } = dao;
    try {
        const space = await Space.delete(args);
        // Check to see if cards are not null
        if(space.cards){
            space.cards.forEach(cardId => {
                Card.delete({ id: cardId })
            })
        }
        return space;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createSpace,
    updateSpace,
    deleteSpace
}