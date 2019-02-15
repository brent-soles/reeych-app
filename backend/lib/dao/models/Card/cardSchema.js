const { Schema } = require('mongoose');

/* Schema Definition */
const cardSchemaDef = {
    spaceId: Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    meta: {
        details: String,
        notes: String,
        questions: String
    },
    dateToSend: {
        type: Date,
        default: null
    },
    sent: Boolean
}

module.exports = {
    cardSchema: new Schema(cardSchemaDef, { timestamps: true })
}