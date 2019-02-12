
// Query resolvers for model: card

/** Returns a single object from card
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx) 
 * @param {*} info 
 */
const getCard = async (_, args, ctx, info) => {
    const { CardsDAO } = ctx.dao;
    try{
        const card = await CardsDAO.get(args);
        return card;
    } catch(err) {
        console.log(err)
    }
    return null;
}

/** Returns multiple objects from card
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx)
 * @param {*} info 
 */
const getCards = async (_, args, ctx, info) => {
    const { CardsDAO } = ctx.dao;
    try {
        // Grabs cards and number of cards for data
        const cards = await CardsDAO.getAll(args);
        return cards;
    } catch(err) {
        console.log(err);
    }
    return null;
}

module.exports = {
    getCard,
    getCards
}