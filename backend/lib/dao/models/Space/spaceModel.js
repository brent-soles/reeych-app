// Basic Imports
const { model } = require('mongoose');
const { spaceSchema } = require('./spaceSchema')


/* DAO Class Definition */
function SpaceDAO() {
    this.schema = model('Space', spaceSchema);
}


/* Operation Definitions */
SpaceDAO.prototype.get = async function( args ) {
    try {
        const space = await this.schema.findOne({_id: id});
        return space;
    } catch(err){
        
    }
}

SpaceDAO.prototype.create = async function( args ) {
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

SpaceDAO.prototype.update = async function( args ) {
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

SpaceDAO.prototype.delete = async function( args ){
    try {
        const space = await this.schema.findOneAndDelete({ _id: id });
        return space;
    } catch (err) {
        throw err;
    }
}


/* Additional Functions */

SpaceDAO.prototype.addCard = async function({ spaceId, cardId }){
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

SpaceDAO.prototype.deleteCard = async function({ spaceId, cardId }){
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
    SpaceDAO: new SpaceDAO()
}