import { REHYDRATE } from 'redux-persist/constants';

const setRoleForNewFbUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ROLE_FOR_NEW_FB_USER':
      return Object.assign({}, state, action.obj);
    case 'SET_LOGGED_OUT':
      return { isCreator: undefined };
    default:
      return state;
  }
};

export default setRoleForNewFbUser;
