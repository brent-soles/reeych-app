let { cards, spaces, meta } = require('./mockData');

const space = (parent, args, context, info) => {
    let newSpace;
    
    spaces.forEach((s) => {
        if(s.id.toString() == args.id){
            s.space = args.name;
            newSpace = s;
            return;
        }
    });

    return newSpace;
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
        space,
        card
    }
}