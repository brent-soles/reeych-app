const { Schema } = require('mongoose');

const spacesSchema = {
    name: String,
    numCards: Number,
    cards: [Schema.Types.ObjectId]
}

const Spaces = new Schema(spacesSchema);

/** DAO Wrappers */
/** methods wrapped in try/catch blocks at resolver layer */


module.exports = {
    Spaces,
    spacesSchema
}
