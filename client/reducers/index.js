import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loggedInUser from './loggedInUser';
import focusGroups from './focusGroups';
import currentFocusGroup from './currentFocusGroup';
import currentProject from './currentProject';
import currentSection from './currentSection';
import currentTesterOption from './currentTesterOption';
import signupwithfb from './signupwithfb';

const rootReducer = combineReducers({
  loggedInUser,
  focusGroups,
  currentFocusGroup,
  currentProject,
  currentSection,
  currentTesterOption,
	signupwithfb,
  router: routerReducer
});

export default rootReducer;