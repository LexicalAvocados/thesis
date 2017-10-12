const example = (state = {
  text: 'example'
}, action) => {
  switch (action.type) {
    case 'CHANGE_EXAMPLE':
      return { text: action.text };
    default:
      return state;
  }
};

export default example;