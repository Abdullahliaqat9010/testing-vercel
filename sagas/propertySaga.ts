import { takeLatest, put } from 'redux-saga/effects';
import { config } from '../config/siteConfigs';

import * as actionType from '../actions/actionTypes';

function* createPropertyRequest({payload}: any) {
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      yield createPropertySuccess();
    }
  } catch (error) {
    console.log(error);
    yield createPropertyError(error);
  }
}

function* createPropertySuccess() {
  yield put({
    type: actionType.CREATE_PROPERTY_SUCCESS,
  });
}

function* createPropertyError(error) {
  yield put({
    type: actionType.CREATE_PROPERTY_ERROR,
    payload: error,
  });
}

export function* propertySaga() {
  yield takeLatest(actionType.CREATE_PROPERTY_REQUEST, createPropertyRequest);
}