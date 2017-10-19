const currentTesterOption = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_TESTER_OPTION':
      return Object.assign({}, state, action.obj);
    case 'SET_LOGGED_OUT':
      return {};
    default:
      return state;
  }
};

export default currentTesterOption;
