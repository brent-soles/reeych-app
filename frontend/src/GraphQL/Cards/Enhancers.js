import * as CardOps from './Operations';
import { graphql } from 'react-apollo';

export const withGetCard = graphql(CardOps.GET_CARD);
export const withAllCards = graphql(CardOps.ALL_CARDS);
export const withCreateCard = graphql(CardOps.CREATE_CARD);
export const withUpdateCard = graphql(CardOps.UPDATE_CARD);
export const withDeleteCard = graphql(CardOps.DELETE_CARD);