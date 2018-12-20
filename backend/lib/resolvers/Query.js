//const { cards, spaces, meta } = require('./mockData');

/** Returns a single card
 * 
 * @param {*} parent 
 * @param {*} args 
 * @param {*} context 
 * @param {*} info 
 */
const card = async (parent, args, context, info) => {
    const { Cards } = context.db;
    const { id } = args;
    try{
        const card = await Cards.findById(id);
        return card;
    } catch(err) {
        console.log(err)
    }
    return null;
}

const cards = async (parent, args, context, info) => {
    const { Spaces, Cards } = context.db;
    const { id } = args;
    try {
        // Grabs cards and number of cards for data
        const allCards = await Spaces.findById(id, 'cards');
        //TODO: Push computation to db
        let result = [];
        for(let card of allCards.cards){
            result.push(await Cards.findById(card._id));
        }
        return result;
    } catch(err) {
        console.log(err);
    }

    return null;
}

/** Returns a single space
 * 
 * @param {*} parent 
 * @param {*} args 
 * @param {*} context 
 * @param {*} info 
 */
const space = async (parent, args, context, info) => {
    const { Spaces, Cards } = context.db;
    const { id } = args;
    try {
        let spc = await Spaces.findById(id);

        return spc;
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