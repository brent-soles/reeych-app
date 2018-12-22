
/**
 * 
 * @param {*} _ 
 * @param {*} args => {
 *      name: String
 * }, only the name should be accept, everything else vanilla
 * @param {*} ctx 
 * @param {*} info 
 */
const createSpace = async (_, args, ctx, info) => {
    const { SpacesDAO } = ctx.DAO; //grabs DAO from db ctx
    try{
        const space = await SpacesDAO.createSpace(args);
        return space;
    } catch(err) {
        console.log(`createSpace: ${err}`);
    }

}

const updateSpace = async (_, args, ctx, info) => {
    const { SpacesDAO } = ctx.DAO;
    try {
        const space = SpacesDAO.updateSpace(args);
        return space;
    } catch(err) {
        console.log(`updateSpace: ${err}`);
    }
}

const deleteSpace = async (_, args, ctx, info) => {
    const { SpacesDAO, CardsDAO } = ctx.DAO;
    try {
        const space = await SpacesDAO.deleteSpace(args);
        space.cards.forEach(cardId => {
            CardsDAO.delete({ id: cardId })
        })
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
 * @param {*} ctx => holds db ctx
 * @param {*} info 
 */
const createCard = async (_, args, ctx, info) => {
    //const { Spaces, Cards } = ctx.DAO; //grabs model from db ctx
    const { SpacesDAO, CardsDAO } = ctx.DAO;
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

const updateCard = async (_, args, ctx, info) => {
    const { CardsDAO } = ctx.DAO;
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
 * @param {*} ctx => holds db ctx
 * @param {*} info 
 */
const deleteCard = async (_, args, ctx, info) => {
    const { SpacesDAO, CardsDAO } = ctx.DAO; //grabs model from db ctx
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
    Mutation: {
        createSpace,
        updateSpace,
        deleteSpace,
        createCard,
        updateCard,
        deleteCard
    }
}