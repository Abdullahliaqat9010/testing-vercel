import { combineReducers } from 'redux';

import userInfo from './userReducer';
import stepBlock from './stepsReducer';

const rootReducer = combineReducers({
  userInfo,
  stepBlock
});

export default rootReducer;