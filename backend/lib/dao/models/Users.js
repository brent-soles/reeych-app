const { Schema, model } = require('mongoose');
const permLevels = require('../../constants/access');

const usersSchema = {
    first: { type: String, required: true },
    last: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    belongsTo: [Schema.Types.ObjectId],
    accessLvl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModified: Date,
    cards: [Schema.Types.ObjectId]
}

function UsersDAO(){
    this.schema = model('Users', new Schema(usersSchema));
}