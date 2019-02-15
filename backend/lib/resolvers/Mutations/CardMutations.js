/**
 * 
 * @param {*} _ 
 * @param {*} args => {
 *      _belongsTo: ID, // Card belongs to a Space (this is a space ID)
 *      title: String,
 *      author: String,
 *      description: String,
 *      meta: {
 *          details: String,
 *          notes: String,
 *          questions: String
 *      } // Object w/ diff values
 *      
 * }
 * @param {*} { dao } => holds db ctx
 * @param {*} info 
 */
const createCard = async (_, args, { dao }, info) => {
    //const { Space, Card } = dao; //grabs model from db ctx
    const { Space, Card } = dao;
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await Card.create(args);
        // Make belongsTo readable
        card.spaceId = card.spaceId.valueOf();
        await Space.addCard({
            spaceId: card.spaceId,
            cardId: card._id
        })

        return card;
    } catch(err){
        throw err;
    }
}


/**
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} param2 
 * @param {*} info 
 */
const updateCard = async (_, args, { dao }, info) => {
    const { Card } = dao;
    // TODO: Data validation
    try {
        const card = await Card.update(args);
        return card;
    } catch (err) {
        throw err;
    }
}


/**
 * 
 * @param {*} _ 
 * @param {*} args => {
 *      id, // Card belongs to a Space (this is a space ID)
 * }
 * @param {*} { dao } => holds db ctx
 * @param {*} info 
 */
const deleteCard = async (_, args, { dao }, info) => {
    const { Space, Card } = dao; //grabs model from db ctx
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await Card.delete(args);
        card.belongsTo = card.belongsTo.valueOf();
        await Space.deleteCard({
            spaceId: card.belongsTo,
            cardId: card._id
        });
        return card;
    } catch(err){
        throw err;
    }
}

module.exports = {
    createCard,
    updateCard,
    deleteCard
}