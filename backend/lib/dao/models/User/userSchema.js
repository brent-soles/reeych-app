const { Schema } = require('mongoose');

/* Schema Definition */
const userSchemaDef = {
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        full: { type: String, required: false }
    },
    emails:[ 
        new Schema({ 
            email: { type: String, required: true, unique: true, match: /([a-zA-z]|(\.|\-|\_))+\@[a-zA-z]+\.(com|net|org)$/ }, verified: { type: Boolean, default: false } 
        }, { _id: false })
    ],
    password: { type: String, required: true },
    memberships: [ 
        {
            spaceId: { type: Schema.Types.ObjectId, required: true },
            spaceName: {type: String, required: true},
            accessLvl: { type: Number, required: true }
        }
    ],
    cards: [
        { cardId: Schema.Types.ObjectId, posted: Boolean }
    ],
    auth: { 
        token: { type: String, required: true, unique: true },
        expires: {type: Number, required: true},
        expired: { type: Boolean, required: true } 
    }
}

module.exports = {
    userSchema: new Schema(userSchemaDef, { timestamps: true })
}