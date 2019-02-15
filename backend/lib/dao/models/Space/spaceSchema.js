const { Schema } = require('mongoose');

/* Schema Definition */
const spaceSchemaDef = {
    name: {type: String, required: true},
    numCards: Number,
    createdAt: {type: Date, default: Date.now},
    lastModified: Date,
    cards: [Schema.Types.ObjectId]
}

module.exports = {
    spaceSchema: new Schema(spaceSchemaDef, { timestamps: true })
}