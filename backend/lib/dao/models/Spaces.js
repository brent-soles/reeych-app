const { Schema, model } = require('mongoose');

const spacesSchema = {
    name: String,
    numCards: Number,
    cards: [Schema.Types.ObjectId]
}

function SpacesDAO() {
    this.schema = model('Spaces', new Schema(spacesSchema));
}

SpacesDAO.prototype.getSpace = async function({ id }){
    try {
        const space = await this.schema.findById(id);
        return space;
    } catch(err){
        
    }
}

SpacesDAO.prototype.createSpace = async function({ name }){
    //takes name, tried to save to db
    const space = new this.schema({
        name: name.toLowerCase(),
        numCards: 0,
        cards: []
    });

    try {
        await space.save();
        return space;
    } catch(err) {
        // Bubbles up to caller
        throw err; 
    }
}


SpacesDAO.prototype.updateSpace = async function({id, name}){
    try {
        const space = await this.schema.findByIdAndUpdate(id, {name});
        space.name = name;
        return space;
    } catch(err) {
        throw err;
    }
}

SpacesDAO.prototype.deleteSpace = async function({id}){
    try {
        const space = await this.schema.findByIdAndDelete(id);
        return space;
    } catch (err) {
        throw err;
    }
}

SpacesDAO.prototype.addCard = async function({ spaceId, cardId }){
    try {
        const space = await this.schema.findByIdAndUpdate(spaceId,
                {
                    $inc: {
                        numCards: 1
                    },
                    $push: {
                        cards: cardId
                    }
                }
            )
        return space;
    } catch(err) {
        //error will bubble
        throw err;
    }
}

SpacesDAO.prototype.deleteCard = async function({ spaceId, cardId }){
    //TODO: Write validation
    //Assume user is perfect... for now...
    try {
        const space = await this.schema.findByIdAndUpdate(spaceId,
            {
                $inc: {
                    numCards: -1
                },
                $pull: {
                    cards: cardId
                }
            }
        )
        return space;
    } catch(err){
        throw err;
    }
}


module.exports = {
    SpacesDAO: new SpacesDAO(),
    spacesSchema
}
