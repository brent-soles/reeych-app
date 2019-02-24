// Basic Imports
// const { model } = require('mongoose');
// const { cardSchema } = require('./cardSchema');

import { model } from 'mongoose';
import { cardSchema, ICard } from './cardSchema'

/* DAO Class Definition */
function CardDAO() {
  this.schema = model('Card', cardSchema);
}


/* Operation Definitions */
CardDAO.prototype.get = async function (args): Promise<ICard> {
  try {
    const { id }: { id: string } = args;
    const card = await this.schema.findOne({ _id: id });
    return card;
  } catch (err) {
    throw err;
  }
}

CardDAO.prototype.create = async function (args): Promise<ICard> {
  const card = new this.schema({ ...args });
  try {
    const result = await card.save();
    result.spaceId = result.spaceId.valueOf();
    return result;
  } catch (err) {
    throw err;
  }
}

CardDAO.prototype.update = async function (args): Promise<ICard> {
  try {
    const { id }: { id: string } = args;
    const card = await this.schema.findOneAndUpdate({ _id: id },
      {
        ...args,
        lastModified: new Date()
      },
      { new: true }
    );
    return card;
  } catch (err) {
    throw err;
  }
}

CardDAO.prototype.delete = async function (args): Promise<ICard> {
  //TODO: Write validation
  //Assume user is perfect... for now...
  try {
    const { id }: { id: string } = args;
    const card = await this.schema.findOneAndDelete({ _id: id });
    return card;
  } catch (err) {
    throw err;
  }
}


/* Additional Functions */

// Gets all cards for a certain space (Note: Space ID is used, not card)
// Returns Query in decending order (newest created to oldest)
CardDAO.prototype.getAll = async function (args): Promise<ICard[]> {
  try {
    const { id }: { id: string } = args;
    const cards: [ICard] = await this.schema.find({ spaceId: id }, null, { sort: { _id: -1 } });
    return cards;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  CardDAO: new CardDAO()
}