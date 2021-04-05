import { takeLatest, put } from 'redux-saga/effects';

import { config } from '../config/siteConfigs';

import * as actionType from '../actions/actionTypes';

function* sendStepsDataRequest({payload}: any) {
  yield put({
    type: actionType.CREATE_USER_REQUEST,
    payload,
  });
}

function* createUserRequest({payload}: any) {
  const { user } = payload;
  console.log(payload);
  try {
    const res = yield fetch(`${ config.apiDomain }/users`, {
      method: 'POST',
      // headers: {
      //   'authToken': payload,
      // },
      body: JSON.stringify({
        firstname: user.firstName,
        email: user.email,
        password: user.password,
        promo_mailing: user.promotions,
        t_c: user.agreement
      })
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(actionType.SEND_STEPS_DATA_REQUEST, sendStepsDataRequest);
  yield takeLatest(actionType.CREATE_USER_REQUEST, createUserRequest);
}