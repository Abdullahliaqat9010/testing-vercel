import { combineReducers } from 'redux';

import userInfo from './userReducer';
import modals from './modalReducers';
import stepsInfo from './stepsReducer';

const rootReducer = combineReducers({
  userInfo,
  stepsInfo,
  modals,
});

export default rootReducer;