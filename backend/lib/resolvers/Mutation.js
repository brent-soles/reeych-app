let { cards, spaces, meta } = require('./mockData');


/**
 * 
 * @param {*} parent 
 * @param {*} args => {
 *      name: String
 * }, only the name should be accept, everything else vanilla
 * @param {*} context 
 * @param {*} info 
 */
const createSpace = async (parent, args, context, info) => {
    const { Spaces } = context.db; //grabs model from db context
    const { name } = args;
    const space = new Spaces({
        name,
        numCards: 0,
        cards: []
    });
    
    try {
        await space.save();
    } catch (err) {
        console.log(err);
    }

    return space;
}

/**
 * 
 * @param {*} parent 
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
 * @param {*} context => holds db context
 * @param {*} info 
 */
const createCard = async (parent, args, context, info) => {
    const { Spaces, Cards } = context.db; //grabs model from db context
    //TODO: Write validation
    //Assume user is perfect... for now...
    const card = new Cards({...args});
    try {
        await card.save();
        let spc = await Spaces.findById({_id: args.belongsTo.valueOf()});
        ++spc.numCards;
        await spc.save();
    } catch(err){
        console.log(err);
    }
    card.belongsTo = card.belongsTo.valueOf();
    return card;
}

module.exports = {
    Mutation: {
        createSpace,
        createCard
    }
}