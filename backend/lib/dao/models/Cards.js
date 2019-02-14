const { Schema, model } = require('mongoose');

const cardsSchema = {
    spaceId: Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    meta: {
        details: String,
        notes: String,
        questions: String
    },
    dateToSend: {
        type: Date,
        default: null
    },
    sent: Boolean
}

// const Cards = new Schema(cardsSchema);

function CardsDAO(){
    this.schema = model('Cards', new Schema(cardsSchema, { timestamps: true }));
}

CardsDAO.prototype.create = async function(args) {
    const card = new this.schema({ ...args });
    try {
        const result = await card.save();
        result.spaceId = result.spaceId.valueOf();
        return result;
    } catch(err){
        throw err;
    }
}

// Gets a cards with a specified card ID
CardsDAO.prototype.get = async function({id}){
    try{
        const card = await this.schema.findOne({_id: id});
        return card;
    } catch (err) {
        throw err;
    }
}

// Gets all cards for a certain space (Note: Space ID is used, not card)
// Returns Query in decending order (newest created to oldest)
CardsDAO.prototype.getAll = async function({ id }){
    try {
        const cards = await this.schema.find({ belongsTo: id }, null, {sort: {_id: -1}});
        return cards;
    } catch(err) {
        throw err;
    }
}

// Updates specified args sent to resolver
CardsDAO.prototype.update = async function({ id, ...args}){
    try {
        const card = await this.schema.findOneAndUpdate({_id: id}, 
            {
                ...args,
                lastModified: new Date()
            }, 
            { new: true }
        );
        return card;
    } catch (err) {
        throw err;
    }
}

CardsDAO.prototype.delete = async function({ id }){
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await this.schema.findOneAndDelete({_id: id});
        return card;
    } catch(err){
        throw err;
    }
}


// Don't need to include ID
module.exports = { 
    CardsDAO: new CardsDAO(),
    cardsSchema
}
