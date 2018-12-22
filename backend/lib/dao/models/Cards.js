const { Schema, model } = require('mongoose');

const cardsSchema = {
    belongsTo: Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    meta: {
        // _belongsTo: Schema.Types.ObjectId, don't need for now?
        details: String,
        notes: String,
        questions: String
    }
}

// const Cards = new Schema(cardsSchema);

function CardsDAO(){
    this.schema = model('Cards', new Schema(cardsSchema));
}

CardsDAO.prototype.create = async function(args) {
    const card = new this.schema({...args});
    try {
        const result = await card.save();
        result.belongsTo = result.belongsTo.valueOf();
        return result;
    } catch(err){
        throw err;
    }
}

// Gets a cards with a specified card ID
CardsDAO.prototype.getCard = async function({id}){
    try{
        const card = await this.schema.findById(id);
        return card;
    } catch (err) {
        throw err;
    }
}

// Gets all cards for a certain space (Note: Space ID is used, not card)
CardsDAO.prototype.getAllCards = async function({ id }){
    try {
        const cards = await this.schema.find({ belongsTo: id });
        return cards;
    } catch(err) {
        throw err;
    }
}

CardsDAO.prototype.update = async function({ id, ...args}){
    try {
        const card = await this.schema.findByIdAndUpdate(id, {...args});
        return card;
    } catch (err) {
        throw err;
    }
}

CardsDAO.prototype.delete = async function({id, ...args}){
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const card = await this.schema.findByIdAndDelete(id);
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
