import { REHYDRATE } from 'redux-persist/constants';

const loggedInUser = (state = {username: undefined, name: undefined, age: undefined, sex: undefined, race: undefined, isCreator: undefined}, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return Object.assign(
        {},
        state,
        {
          username: action.username,
          name: action.name,
          age: action.age,
          sex: action.sex,
          race: action.race,
          isCreator: action.isCreator
        }
      );
    case 'SET_LOGGED_OUT':
      return {username: undefined, name: undefined, age: undefined, sex: undefined, race: undefined, isCreator: undefined};
    case 'SET_NAME':
      return Object.assign({}, state, {name: action.name});
    case 'SET_AGE':
      return Object.assign({}, state, {age: action.age});
    case 'SET_SEX':
      return Object.assign({}, state, {sex: action.sex});
    case 'SET_RACE':
      return Object.assign({}, state, {race: action.race});
    case 'persist/REHYDRATE':
      if (action.payload.loggedInUser) return action.payload.loggedInUser;
      else return state;
    default:
      return state;
  }
};

export default loggedInUser;