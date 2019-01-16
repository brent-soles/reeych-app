const { Schema, model } = require('mongoose');
const permLevels = require('../../constants/access');

const usersSchema = {
    first: String,
    last: String,
    accessLvl: String,
    createdAt: Date,
    lastModified: Date,
    cards: [Schema.Types.ObjectId]
}

// For testing
const testEntities = {
    USER: ["john smith", "hello world"],
    SPACE_USER: ["fox xof", "so cks"],
    SPACE_ADMIN: ["Bro Uno", "Bro Dos"]
}

function UsersDAO() {
    this.schema = model('Spaces', new Schema(usersSchema));
}

UsersDAO.prototype.create = async function({ spaceId, first, last, AccessLvlReq, authorityEntity }){
    // Create a user with the first and last name 
    // In the specified space only if authority entity is allowed (i.e. Space Admin)
    console.log(authorityEntity)
    console.log(!testEntities.SPACE_ADMIN.includes(authorityEntity.requester))
    console.log(authorityEntity.accessLvl !==  permLevels.SPACE_ADMIN)
    console.log(!testEntities.SPACE_ADMIN.includes(authorityEntity.requester)
    && 
    authorityEntity.accessLvl !==  permLevels.SPACE_ADMIN)
    if( !testEntities.SPACE_ADMIN.includes(authorityEntity.requester)
        || 
        authorityEntity.accessLvl !==  permLevels.SPACE_ADMIN)
    {
        throw new Error(`${authorityEntity.requester} does not have permission to add a Space Admin`);
    }
}

udao = new UsersDAO()

console.log(permLevels);

// Should log success
udao.create({ 
    spaceId: 1,
    first: "first",
    last: "last",
    accessLvlReq: "SPACE_ADMIN",
    authorityEntity: {
        requester: "Bro Uno",
        accessLvl: "SPACE_ADMIN"
    }
}).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err);
})

// Should log error
udao.create({ 
    spaceId: 1,
    first: "first",
    last: "last",
    accessLvlReq: "SPACE_ADMIN",
    authorityEntity: {
        requester: "john smith",
        accessLvl: "USER"
    }
}).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err);
})

// Should log error
udao.create({ 
    spaceId: 1,
    first: "first",
    last: "last",
    accessLvlReq: "SPACE_ADMIN",
    authorityEntity: {
        requester: "john smith",
        accessLvl: "SPACE_ADMIN"
    }
}).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err);
})