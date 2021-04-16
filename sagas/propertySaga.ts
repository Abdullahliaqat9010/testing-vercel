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

function* getPropertyForCurrentUser({payload}: any) {
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/users/${ payload }/property`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const data = yield res.json();
      yield getPropertyForCurrentUserSuccess(data.properties);
    }

  } catch (error) {
    yield getPropertyForCurrentUserError(error)
  }
}

function* getPropertyForCurrentUserSuccess(data: object) {
  yield put({
    type: actionType.GET_USER_PROPERTY_SUCCESS,
    payload: data,
  });
}
function* getPropertyForCurrentUserError(error: string) {
  yield put({
    type: actionType.GET_USER_PROPERTY_ERROR,
    payload: error,
  });
}

export function* propertySaga() {
  yield takeLatest(actionType.CREATE_PROPERTY_REQUEST, createPropertyRequest);
  yield takeLatest(actionType.GET_USER_PROPERTY_REQUEST, getPropertyForCurrentUser);
}