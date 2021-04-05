import { takeLatest, put } from 'redux-saga/effects';
import { config } from '../config/siteConfigs';

import * as actionType from '../actions/actionTypes';

function* createPropertyRequest({payload}: any) {

}

export function* propertySaga() {
  yield takeLatest(actionType.CREATE_PROPERTY_REQUEST, createPropertyRequest);
}