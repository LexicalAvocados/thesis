const lineGraphData = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_LINE_GRAPH_DATA':
      return Object.assign({}, {}, action.obj);
    default:
      return state;
  }
};
  
export default lineGraphData;