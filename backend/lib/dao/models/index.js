const { Types } = require('mongoose');
const { Spaces } = require('./Spaces');
const { Cards } = require('./Cards');

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
            name: "Spaces",
            schema: Spaces
        },
        {
            name: "Cards",
            schema: Cards
        }
    ]
}