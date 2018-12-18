const { cards, spaces, meta } = require('./mockData');

/** Returns a single card
 * 
 * @param {*} parent 
 * @param {*} args 
 * @param {*} context 
 * @param {*} info 
 */
const card = (parent, args, context, info) => {
    let card = cards.filter((card) => {
        if (card.id.toString() === args.id){
            return card;
        }
    })[0];
    return card;
}


/** Returns a single space
 * 
 * @param {*} parent 
 * @param {*} args 
 * @param {*} context 
 * @param {*} info 
 */
const space = async (parent, args, context, info) => {
    const { Spaces } = context.db;
    const { id } = args;
    try {
        const spc = await Spaces.findById(id);
        return spc;
    } catch(err) {
        console.log(err);
    }
    return null;
}


module.exports = {
    Query: {
        card,
        cards: () => cards,
        space,
        spaces: () => spaces
    }
}