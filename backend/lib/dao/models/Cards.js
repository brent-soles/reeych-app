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

// Don't need to include ID
module.exports = { 
    Cards: new Schema(cardsSchema),
    cardsSchema
}
//module.exports.cardsSchema = cardsSchema;