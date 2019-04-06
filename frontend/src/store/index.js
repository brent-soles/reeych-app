// import { useReducer, useContext } from 'React';
import { funnl } from 'funnl';

const cardsInitialState = ({ cards }) => (cards ? { cards } : { cards: [] });
const cardsReducer = (state, action) => {

}

const spacesInitialState = ({ spaces }) => (spaces ? { spaces } : { spaces: [] });
const spacesReducer = (state, action) => {

}

const profileInitialState = ({ profile }) => (profile ? { profile } : { profile: {} })
const profileReducer = (state, action) => {

}

const hydrateReducersState = () => {
  if(!window) return {};
  ;

  const localStore = window.localStorage.getItem('reeych-dev');
  const localData = JSON.parse(localStore);

  return {
    reducer: function(state, action) {
      // target: the store wanting to be targeted
      const { target } = action;
      switch(target) {
        case 'cards':
          return cardsReducer(state, action);
        case 'spaces':
          return spacesReducer(state, action);
        case 'profile':
          return profileReducer(state, action);
        default:
          throw new Error(`Need to pass a 'target:target' key-value pair to global reducer`)
      }
    },
    seed: funnl([
      window.localStorage.getItem('reeych-dev'),
      JSON.parse
    ]) || {cards: {}, spaces: {}, profile: {}}
  }
}

export default hydrateReducersState;