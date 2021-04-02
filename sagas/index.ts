import { all } from 'redux-saga/effects';

import { userSaga } from './userSaga';
import { propertySaga } from './propertySaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    propertySaga(),
  ]);
}