
const { Types } = require('mongoose');

/* DAO Access Objects */
const { SpaceDAO } = require('./Space/spaceModel');
const { CardDAO } = require('./Card/cardModel');
const { UserDAO } = require('./User/userModel');
const { SpacesDAO } = require('./Spaces');
const { CardsDAO } = require('./Cards');

/**
 * For interoperability with MongoDB ID's
 */
const { ObjectId } = Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

module.exports = {
    models: [
        {
            name: 'Space',
            daoObj: SpaceDAO
        },
        {
            name: 'Card',
            daoObj: CardDAO
        },
        {
            name: 'User',
            daoObj: UserDAO
        },
        {
            name: 'Spaces',
            daoObj: SpacesDAO
        },
        {
            name: 'Cards',
            daoObj: CardsDAO
        }
    ]
}