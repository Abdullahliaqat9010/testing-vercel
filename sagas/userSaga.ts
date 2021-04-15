import { takeLatest, put } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';

import { parseJwt } from '../utils';
import { config } from '../config/siteConfigs';


function* sendStepsDataRequest({payload}: any) {
  yield put({
    type: actionType.SIGNUP_USER_REQUEST,
    payload,
  });
}

function* signupUserRequest({payload}: any) {
  const {user, property} = payload;
  try {
    const res = yield fetch(`${ config.apiDomain }/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: user.firstName,
        email: user.email,
        password: user.password,
        promo_mailing: user.promotions,
        t_c: user.agreement,
      }),
    });

    if (res.status === 201) {
      const data = yield res.json();
      localStorage.setItem('auth', data.access_token);
      yield signupUserSuccess(data, property);
    }

  } catch (error) {
    console.log(error);
    yield signupUserError(error);
  }
}

function* signupUserSuccess(userData: { access_token: string }, property: object) {
  yield put({type: actionType.SIGNUP_USER_SUCCESS});
  const parseData = parseJwt(userData.access_token);
  yield put({
    type: actionType.CREATE_PROPERTY_REQUEST,
    payload: {
      ...property,
      leadId: parseData.id,
    },
  });
}

function* signupUserError(error: string) {
  yield put({
    type: actionType.SIGNUP_USER_ERROR,
    payload: error,
  });
}

function* loginUserRequest({payload}: any) {
  const user = {
    email: payload.userData,
    password: payload.password,
  };

  try {
    const res = yield fetch(`${ config.apiDomain }/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    if (res.status === 201) {
      const data = yield res.json();
      localStorage.setItem('auth', data.access_token);
      yield loginUserSuccess();
    }
  } catch (error) {
    yield loginUserError(error);
  }
}

function* loginUserSuccess() {
  yield put({
    type: actionType.LOGIN_USER_SUCCESS,
  });
}

function* loginUserError(error: string) {
  console.log(error);
  yield put({
    type: actionType.LOGIN_USER_ERROR,
    payload: error,
  });
}

export function* userSaga() {
  yield takeLatest(actionType.SEND_STEPS_DATA_REQUEST, sendStepsDataRequest);
  yield takeLatest(actionType.SIGNUP_USER_REQUEST, signupUserRequest);
  yield takeLatest(actionType.LOGIN_USER_REQUEST, loginUserRequest);
}