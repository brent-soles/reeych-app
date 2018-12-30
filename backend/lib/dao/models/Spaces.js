const { Schema, model } = require('mongoose');

const spacesSchema = {
    name: String,
    numCards: Number,
    createdAt: Date,
    lastModified: Date,
    cards: [Schema.Types.ObjectId]
}

function SpacesDAO() {
    this.schema = model('Spaces', new Schema(spacesSchema));
}

SpacesDAO.prototype.get = async function({ id }){
    try {
        const space = await this.schema.findOne({_id: id});
        return space;
    } catch(err){
        
    }
}

SpacesDAO.prototype.create = async function({ name }){
    //takes name, tried to save to db
    name = name.toLowerCase();
    const space = new this.schema({
        name,
        numCards: 0,
        createdAt: new Date(),
        lastModified: new Date(),
        cards: []
    });

    try {
        const exists = await this.schema.findOne({ name });
        if(exists){
            throw {
                error: [
                    `Cannot create space with name ${name}.`,
                    `Must create a space with a unique name besides ${name}`
                ]
            };
        }
        await space.save();
        return space;
    } catch(err) {
        // Bubbles up to caller
        throw err; 
    }
}


SpacesDAO.prototype.update = async function({id, name}){
    try {
        const space = await this.schema.findOneAndUpdate({ _id: id }, 
            { 
                name,
                lastModified: new Date()
            }, 
            { new: true }
        );
        return space;
    } catch(err) {
        throw err;
    }
}

SpacesDAO.prototype.delete = async function({id}){
    try {
        const space = await this.schema.findOneAndDelete({ _id: id });
        return space;
    } catch (err) {
        throw err;
    }
}

/** Card specific operations */

SpacesDAO.prototype.addCard = async function({ spaceId, cardId }){
    try {
        const space = await this.schema.findOneAndUpdate({ _id: spaceId },
            {
                $inc: {
                    numCards: 1
                },
                $push: {
                    cards: cardId
                }
            },
            { new: true }
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
        const space = await this.schema.findOneAndUpdate({ _id: spaceId },
            {
                $inc: {
                    numCards: -1
                },
                $pull: {
                    cards: cardId
                }
            },
            { new: true }
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
