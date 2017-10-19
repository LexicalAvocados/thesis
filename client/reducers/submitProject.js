const submitProject = (state = {}, action) => {
  switch(action.type) {
    case 'SUBMIT_CURRENT_PROJECT_TO_LIST':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
};

export default submitProject;