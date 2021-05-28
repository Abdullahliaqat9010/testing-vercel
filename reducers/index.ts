import { combineReducers } from 'redux';

import userInfo from './userReducer';
import modals from './modalReducers';
import stepsInfo from './stepsReducer';
import agency from './agencyReducers';

const rootReducer = combineReducers({
  userInfo,
  stepsInfo,
  modals,
  agency,
});

export default rootReducer;