import { funnl } from 'funnl';
import { cards } from '../lib/mockData/card';
import { profile } from '../lib/mockData/profile';
import { spaces } from '../lib/mockData/spaces';
import { authentication } from '../lib/mockData/authentication';


// const cardsInitialState = ({ cards }) => (cards ? { cards } : { cards: [] });
const cardsReducer = (state, action) => {

}

// const spacesInitialState = ({ spaces }) => (spaces ? { spaces } : { spaces: [] });
const spacesReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'UPDATE_CURRENT':
      const newSpaces = { ...state.spaces, current: payload }
      return { ...state, spaces: newSpaces }
    default:
      return state;
  }
}

// const profileInitialState = ({ profile }) => (profile ? { profile } : { profile: {} })
const profileReducer = (state, action) => {

}

const authenticationReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case 'authenticate':
      return {
        ...state,
        authentication: payload
      }
    case 'revoke_authentication':
      return {
        ...state,
        authentication: null
      }
    default:
      return state;
  }
}

const hydrateReducersState = () => {
  if(!window) return {};

  const registeredReducers = ['authentication', 'cards', 'spaces', 'profile']

  return {
    reducer: function(state, action) {
      // target: the store wanting to be targeted
      const { target } = action;
      switch(target) {
        case 'authentication':
          return authenticationReducer(state, action);
        case 'cards':
          return cardsReducer(state, action);
        case 'spaces':
          return spacesReducer(state, action);
        case 'profile':
          return profileReducer(state, action);
        default:
          throw new Error(`
            Need to pass a 'target:target' key-value pair to global reducer
              Current registered reducers: ${registeredReducers}
          `)
      }
    },
    seed: funnl([
      window.localStorage.getItem('reeych-dev'),
      JSON.parse
    ]) || { authentication, cards, spaces, profile }
  }
}

export default hydrateReducersState;