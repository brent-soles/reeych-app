
// Query resolvers for model: card

/** Returns a single object from card
 * 
 * @param {*} _ => parent
 * @param {*} args 
 * @param {*} ctx => request context (ctx) 
 * @param {*} info 
 */
const getCard = async (_, args, { dao, cookies }, info) => {
    const { Card } = dao;
    console.log(cookies.get('reeych'))
    try{
        const card = await Card.get(args);
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
    const { Card } = ctx.dao;
    try {
        // Grabs cards and number of cards for data
        const cards = await Card.getAll(args);
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