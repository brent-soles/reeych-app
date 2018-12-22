const { Types } = require('mongoose');
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
            name: "SpacesDAO",
            daoObj: SpacesDAO
        },
        {
            name: "CardsDAO",
            daoObj: CardsDAO
        }
    ]
}