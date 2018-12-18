let { cards, spaces, meta } = require('./mockData');

const createSpace = async (parent, args, context, info) => {
    const { Spaces } = context.db;
    console.log(args)
    const space = new Spaces({
        ...args,
        numCards: 0,
        cards: [],
        meta: {}
    });

    try {
        await space.save();
    } catch (err) {
        console.log(err)
    }

    return space;
}

const card = (parent, args, context, info) => {
    let newCard;
    cards.forEach((c) => {
        if(c.id.toString() == args.id){
            for(key in args){
                if(key !== 'id'){
                    c[key] = args[key];
                }
            }
            newCard = c;
        }
    })

    return newCard;
}

module.exports = {
    Mutation: {
        createSpace,
        card
    }
}