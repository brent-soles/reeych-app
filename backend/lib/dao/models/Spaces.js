const { Schema } = require('mongoose');

const spacesSchema = {
    name: String,
    numCards: Number,
    cards: [{
        _id: Schema.Types.ObjectId,
        _belongsTo: Schema.Types.ObjectId,
        title: String,
        author: String,
        description: String,
        
    }],
    meta: {
        _belongsTo: Schema.Types.ObjectId,
        details: String,
        notes: String,
        questions: String
    }
}

// Don't need to include ID
module.exports = Spaces = new Schema(spacesSchema);