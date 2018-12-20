const { Schema } = require('mongoose');

const spacesSchema = {
    name: String,
    numCards: Number,
    cards: [Schema.Types.ObjectId]
}

module.exports = {
    Spaces: new Schema(spacesSchema),
    spacesSchema
}
