import { takeLatest, put } from "redux-saga/effects";

import * as actionType from "../actions/actionTypes";

import { parseJwt } from "../utils";
import { config } from "../config/siteConfigs";
import { createPropertyRequest } from "./propertySaga";
import axios from "axios";

function* checkExistEmail({ payload }: any) {
	try {
		const { data: exists } = yield axios.get(`users/${payload}/exist`);
		yield checkExistEmailSuccess(exists);
	} catch (error) {
		yield checkExistEmailError(error);
	}
}

function* checkExistEmailSuccess(data: boolean) {
	yield put({
		type: actionType.CHECK_IF_EXIST_EMAIL_SUCCESS,
		payload: data,
	});
}

function* checkExistEmailError(error: string) {
	console.error(error);
	yield put({
		type: actionType.CHECK_IF_EXIST_EMAIL_ERROR,
		payload: error,
	});
}

function* verifyEmail({ payload }: any) {
	try {
		yield axios.post(
			"auth/verify-email",
			{},
			{
				params: {
					token: payload,
				},
			}
		);
		yield verifyEmailSuccess();
	} catch (error) {
		yield verifyEmailError(error);
	}
}

function* verifyEmailSuccess() {
	yield put({
		type: actionType.VERIFY_EMAIL_SUCCESS,
	});
}

function* verifyEmailError(error: string) {
	console.error(error);
	yield put({
		type: actionType.VERIFY_EMAIL_ERROR,
		payload: error,
	});
}

function* sendStepsDataRequest({ payload }: any) {
	yield put({
		type: actionType.SIGNUP_USER_REQUEST,
		payload,
	});
}

function* remindPasswordRequest({ payload }: any) {
	const { email, locale } = payload;
	try {
		yield axios.post("auth/recover-password", {
			email,
			locale,
		});
		yield remindPasswordSuccess();
	} catch (e) {
		yield remindPasswordError(e);
	}
}

function* remindPasswordSuccess() {
	yield put({
		type: actionType.REMIND_PASSWORD_SUCCESS,
	});
}

function* remindPasswordError(error: string) {
	console.error(error);
	yield put({
		type: actionType.REMIND_PASSWORD_ERROR,
		payload: error,
	});
}

function* sendDataForUpdatePasswordRequest({ payload }: any) {
	try {
		const { token, password } = payload;
		yield axios.post("auth/reset-password", {
			token,
			password,
		});

		yield sendDataForUpdatePasswordSuccess();
	} catch (e) {
		yield sendDataForUpdatePasswordError(e);
	}
}

function* sendDataForUpdatePasswordError(error: string) {
	console.error(error);
	yield put({
		type: actionType.CHANGE_PASSWORD_ERROR,
		payload: error,
	});
}

function* sendDataForUpdatePasswordSuccess() {
	yield put({
		type: actionType.CHANGE_PASSWORD_SUCCESS,
	});
}

function* signupUserRequest({ payload }: any) {
	const { user, property, locale } = payload;
	try {
		const { data } = yield axios.post(
			"auth/signup",
			{
				firstname: user.firstName,
				lastname: user.lastName,
				email: user.email,
				phone_number: user.phone_number,
				password: user.password,
				promo_mailing: user.promotions,
				t_c: user.agreement,
			},
			{
				params: {
					locale,
				},
			}
		);
		yield loginUserSuccess(data);
		yield signupUserSuccess(data, property);
		window.location.href = "/dashboard";
	} catch (error) {
		console.error(error);
		yield signupUserError(error);
	}
}

function* signupUserSuccess(
	userData: { access_token: string },
	property: object
) {
	const parseData = parseJwt(userData.access_token);
	yield put({
		type: actionType.CREATE_PROPERTY_REQUEST,
		payload: {
			...property,
			leadId: parseData?.id,
		},
	});
}

function* signupUserError(error: string) {
	yield put({
		type: actionType.SIGNUP_USER_ERROR,
		payload: error,
	});
}

function* loginUserRequest({ payload }: any) {
	const user = {
		email: payload.userData,
		password: payload.password,
	};
	try {
		const { data } = yield axios.post("auth/login", {
			email: user.email,
			password: user.password,
		});
		yield loginUserSuccess(data);
		window.location.href = "/dashboard";
	} catch (error) {
		yield loginUserError("Invalid email or password");
	}
}

function* loginUserSuccess({
	access_token,
	refresh_token,
}: {
	access_token: string;
	refresh_token: string;
}) {
	const parseData = parseJwt(access_token);
	localStorage.setItem("access_token", access_token);
	localStorage.setItem("refresh_token", refresh_token);
	yield fetch("/auth-api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			access_token: access_token,
			refresh_token: refresh_token,
		}),
	});
	yield put({
		type: actionType.LOGIN_USER_SUCCESS,
		payload: {
			userName: parseData?.firstname,
			userSurname: parseData?.lastname,
			userEmail: parseData?.email,
			userPhone: parseData?.phone_number,
			gender: parseData?.gender,
			avatar: parseData?.avatar,
			emailVerified: parseData?.email_verified,
			accountType: parseData?.account_type,
			id: parseData?.id,
			t_c: parseData?.t_c,
			promo_mailing: parseData?.promo_mailing,
		},
	});
}

function* loginUserError(error: string) {
	console.error(error);
	yield put({
		type: actionType.LOGIN_USER_ERROR,
		payload: error,
	});
}

function* logoutUserRequest() {
	try {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		yield fetch("/auth-api/logout", {
			method: "POST",
		});
		yield put({
			type: actionType.LOGOUT_USER_SUCCESS,
		});
		window.location.href = "/";
	} catch (error) {
		console.log(error);
	}
}

function* contactAgencyRequest({ payload }: any) {
	try {
		yield axios.post("agency/contact", {
			...payload,
		});
		yield contactAgencySuccess();
	} catch (error) {
		yield contactAgencyError(error);
	}
}

function* contactAgencySuccess() {
	yield put({
		type: actionType.CONTACT_AGENCY_SUCCESS,
	});
}

function* contactAgencyError(error: string) {
	console.error(error);
	yield put({
		type: actionType.CONTACT_AGENCY_ERROR,
		payload: error,
	});
}

export function* userSaga() {
	yield takeLatest(actionType.SEND_STEPS_DATA_REQUEST, sendStepsDataRequest);
	yield takeLatest(actionType.SIGNUP_USER_REQUEST, signupUserRequest);
	yield takeLatest(actionType.LOGIN_USER_REQUEST, loginUserRequest);
	yield takeLatest(actionType.LOGOUT_USER_REQUEST, logoutUserRequest);
	yield takeLatest(actionType.CONTACT_AGENCY_REQUEST, contactAgencyRequest);
	yield takeLatest(actionType.CHECK_IF_EXIST_EMAIL, checkExistEmail);
	yield takeLatest(actionType.VERIFY_EMAIL, verifyEmail);
	yield takeLatest(actionType.REMIND_PASSWORD_REQUEST, remindPasswordRequest);
	yield takeLatest(
		actionType.CHANGE_PASSWORD_REQUEST,
		sendDataForUpdatePasswordRequest
	);
}
