const currentOptionAnnotations = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_OPTION_ANNOTATIONS':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
};
  
export default currentOptionAnnotations;