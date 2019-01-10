
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
    const { SpacesDAO } = dao; //grabs DAO from db ctx
    try{
        const space = await SpacesDAO.create(args);
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
    const { SpacesDAO } = dao;
    try {
        const space = SpacesDAO.update(args);
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
    const { SpacesDAO, CardsDAO } = dao;
    try {
        const space = await SpacesDAO.delete(args);
        // Check to see if cards are not null
        if(space.cards){
            space.cards.forEach(cardId => {
                CardsDAO.delete({ id: cardId })
            })
        }
        return space;
    } catch (err) {
        console.log(err);
    }
}

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
 * @param {*}{ dao } => holds db ctx
 * @param {*} info 
 */
const createCard = async (_, args, { dao }, info) => {
    //const { Spaces, Cards } = dao; //grabs model from db ctx
    const { SpacesDAO, CardsDAO } = dao;
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await CardsDAO.create(args);
        // Make belongsTo readable
        card.belongsTo = card.belongsTo.valueOf();
        await SpacesDAO.addCard({
            spaceId: card.belongsTo,
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
    const { CardsDAO } = dao;
    // TODO: Data validation
    try {
        const card = await CardsDAO.update(args);
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
    const { SpacesDAO, CardsDAO } = dao; //grabs model from db ctx
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await CardsDAO.delete(args);
        card.belongsTo = card.belongsTo.valueOf();
        await SpacesDAO.deleteCard({
            spaceId: card.belongsTo,
            cardId: card._id
        });
        return card;
    } catch(err){
        throw err;
    }
}


module.exports = {
    createSpace,
    updateSpace,
    deleteSpace,
    createCard,
    updateCard,
    deleteCard
}