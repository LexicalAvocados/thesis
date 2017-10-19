const currentProject = (state = { sections: [] }, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PROJECT':
      return Object.assign({}, state, action.obj);
    case 'ADD_SECTIONS_TO_CURRENT_PROJECT':
      return { ...state, sections: [ action.sectionObj, ...state.sections ]};
    case 'SET_LOGGED_OUT':
      return {};
    default:
      return state;
  }
};

export default currentProject;
