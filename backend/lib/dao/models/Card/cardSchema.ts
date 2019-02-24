import { Schema } from 'mongoose';

/* Interface Definitions */

interface ICardMeta {
  details: string;
  notes: string;
  questions: string;
}

export interface ICard {
  spaceId: Schema.Types.ObjectId;
  title: string;
  author: string;
  description: string;
  meta?: ICardMeta;
  dateToSend: Date;
  sent: boolean;
}

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

// To typecheck
export const cardSchema: Schema = new Schema(cardSchemaDef, { timestamps: true });
