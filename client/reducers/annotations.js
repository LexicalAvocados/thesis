const annotations = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_ANNOTATIONS':
      return Object.assign({}, {}, action.obj);
    default:
      return state;
  }
};
  
export default annotations;