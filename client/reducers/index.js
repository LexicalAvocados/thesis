import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import currentProject from './currentProject.js';

const rootReducer = combineReducers({
	example,
  router: routerReducer,
  currentProject: currentProject
});

export default rootReducer;
