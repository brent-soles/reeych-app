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
    let { name } = args;
    const space = new Spaces({
        name: name.toLowerCase(),
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
    const card = await new Cards({...args});
    try {
        const result = await card.save();
        await Spaces.findByIdAndUpdate(args.belongsTo.valueOf(),
            {
                $inc: {
                    numCards: 1
                },
                $push: {
                    cards: card._id
                }
            }
        )
        result.belongsTo = result.belongsTo.valueOf();
        return result;
    } catch(err){
        console.log(err);
    }
    
    return null;
}

/**
 * 
 * @param {*} parent 
 * @param {*} args => {
 *      id, // Card belongs to a Space (this is a space ID)
 * }
 * @param {*} context => holds db context
 * @param {*} info 
 */
const deleteCard = async (parent, args, context, info) => {
    const { Spaces, Cards } = context.db; //grabs model from db context
    //TODO: Write validation
    //Assume user is perfect... for now...
    const { id } = args;
    try {
        const card = await Cards.findByIdAndDelete(id);
        await Spaces.findByIdAndUpdate(card.belongsTo.valueOf(),
            {
                $inc: {
                    numCards: -1
                },
                $pull: {
                    cards: card._id
                }
            }
        )
        card.belongsTo = card.belongsTo.valueOf();
        return card;
    } catch(err){
        console.log(err);
    }
    return null;
}

module.exports = {
    Mutation: {
        createSpace,
        createCard,
        deleteCard
    }
}