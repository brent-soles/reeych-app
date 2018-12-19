const { Schema } = require('mongoose');
const { cardsSchema } = require('./Cards');

const spacesSchema = {
    name: String,
    numCards: Number,
    cards: [cardsSchema]
}

module.exports = {
    Spaces: new Schema(spacesSchema),
    spacesSchema
}
