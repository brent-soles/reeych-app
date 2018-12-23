
/** Returns a single card
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} ctx 
 * @param {*} info 
 */
const card = async (_, args, ctx, info) => {
    const { CardsDAO } = ctx.DAO;
    try{
        const card = await CardsDAO.get(args);
        return card;
    } catch(err) {
        console.log(err)
    }
    return null;
}

const cards = async (_, args, ctx, info) => {
    const { CardsDAO } = ctx.DAO;
    
    try {
        // Grabs cards and number of cards for data
        const cards = await CardsDAO.getAll(args);
        return cards;
    } catch(err) {
        console.log(err);
    }

    return null;
}

/** Returns a single space
 * 
 * @param {*} _ 
 * @param {*} args 
 * @param {*} ctx 
 * @param {*} info 
 */
const space = async (_, args, ctx, info) => {
    const { SpacesDAO } = ctx.DAO;
    try {
        let space = await SpacesDAO.get(args);
        return space;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    Query: {
        card,
        cards,
        space
    }
}