const currentOption = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_OPTION':
      console.log("testinggggggggggg")
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
};
  
export default currentOption;