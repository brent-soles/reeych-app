const { Schema } = require('mongoose');

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

const Cards = new Schema(cardsSchema);

// Don't need to include ID
module.exports = { 
    Cards,
    cardsSchema
}
