const { cards, spaces } = require('./mockData');

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
const space = (parent, args, context, info) => {
    let spc = spaces.filter((s) => {
        if(s.id.toString() == args.id){
            return s;
        }
    })[0];

    return spc;
}


module.exports = {
    Query: {
        card,
        cards: () => cards,
        space,
        spaces: () => spaces
    }
}