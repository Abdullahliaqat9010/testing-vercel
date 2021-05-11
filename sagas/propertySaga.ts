import { takeLatest, put } from 'redux-saga/effects';
import { config } from '../config/siteConfigs';

import * as actionType from '../actions/actionTypes';

export function* createPropertyRequest({payload}: any) {
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

function* updatePropertyRequest({payload}: any) {
  try {
    const {data, propertyId} = payload;

    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/property/${ propertyId }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      yield updatePropertySuccess();
    }
  } catch (error) {
    console.log(error);
    yield updatePropertyError(error);
  }
}

function* updatePropertySuccess() {
  yield put({
    type: actionType.UPDATE_PROPERTY_SUCCESS,
  });
}

function* updatePropertyError(error) {
  yield put({
    type: actionType.UPDATE_PROPERTY_ERROR,
    payload: error,
  });
}

function* createPropertySuccess() {
  window.sessionStorage.removeItem('forgotLogin');
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
    yield getPropertyForCurrentUserError(error);
  }
}

function* getPropertyForCurrentUserSuccess(data: []) {
  if (data.length) {
    const {id} = data[data.length - 1];
    yield getSimilarPropertyRequest(id, 1, 2);
  }
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

function* getSimilarPropertyRequest(propertyId: number, page: number, limit: number) {
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/property/${propertyId}/similar?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const {data} = yield res.json();
      yield getSimilarPropertySuccess(data);
    }

  } catch (error) {
    yield getSimilarPropertyError(error);
  }
}

function* getSimilarPropertySuccess(data: []) {
  yield put({
    type: actionType.GET_SIMILAR_PROPERTY_SUCCESS,
    payload: data,
  });
}

function* getSimilarPropertyError(error: string) {
  console.log(error);
  yield put({
    type: actionType.GET_SIMILAR_PROPERTY_ERROR,
    payload: error,
  });
}

function* getPriceProperty({payload}: any) {
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/property/${ payload }/estimation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const { data } = yield res.json();
      if(data.message !== 'Not found') {
        yield getPricePropertySuccess(data);
      } else {
        yield setNoEstimationProperty();
      }
    }

  } catch (error) {
    yield getPricePropertyError(error);
  }
}

function* getPricePropertySuccess(data: object) {
  yield put({
    type: actionType.GET_PRICE_PROPERTY_SUCCESS,
    payload: data,
  });
}

function* getPricePropertyError(error: string) {
  yield put({
    type: actionType.GET_PRICE_PROPERTY_ERROR,
    payload: error,
  });
}

function* setNoEstimationProperty() {
  yield put({
    type: actionType.NO_ESTIMATION_PROPERTY,
  });
}

export function* propertySaga() {
  yield takeLatest(actionType.CREATE_PROPERTY_REQUEST, createPropertyRequest);
  yield takeLatest(actionType.UPDATE_PROPERTY_REQUEST, updatePropertyRequest);
  yield takeLatest(actionType.GET_USER_PROPERTY_REQUEST, getPropertyForCurrentUser);
  yield takeLatest(actionType.GET_PRICE_PROPERTY_REQUEST, getPriceProperty);
}