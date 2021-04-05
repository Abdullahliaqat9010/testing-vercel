import { combineReducers } from 'redux';

import userInfo from './userReducer';
import stepsInfo from './stepsReducer';

const rootReducer = combineReducers({
  userInfo,
  stepsInfo
});

export default rootReducer;