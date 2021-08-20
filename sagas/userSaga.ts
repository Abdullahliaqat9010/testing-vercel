import { takeLatest, put } from "redux-saga/effects";

import * as actionType from "../actions/actionTypes";

import { parseJwt } from "../utils";
import { config } from "../config/siteConfigs";
import { createPropertyRequest } from "./propertySaga";

function* checkExistEmail({ payload }: any) {
	try {
		const res = yield fetch(`${config.apiDomain}/users/${payload}/exist`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = yield res.json();
		yield checkExistEmailSuccess(data);
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
		const res = yield fetch(`${config.apiDomain}/auth/verify-user/${payload}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const { data } = yield res.json();

		if (res.status == 401) {
			yield verifyEmailError(data.message);
		}

		if (res.status == 200) {
			yield verifyEmailSuccess(data.access_token);
		}
	} catch (error) {
		yield verifyEmailError(error);
	}
}

function* verifyEmailSuccess(token: string) {
	localStorage.setItem("auth", token);
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
		const res = yield fetch(`${config.apiDomain}/auth/recover`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				locale,
			}),
		});

		if (res.status === 204) {
			yield remindPasswordSuccess();
		} else {
			yield remindPasswordError("something went wrong");
		}
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
		const res = yield fetch(`${config.apiDomain}/auth/reset`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
				password,
			}),
		});

		if (res.status === 204) {
			yield sendDataForUpdatePasswordSuccess();
		} else {
			const data = yield res.json();
			yield sendDataForUpdatePasswordError(data.message);
		}
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
		const res = yield fetch(
			`${config.apiDomain}/auth/signup?locale=${locale}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname: user.firstName,
					lastname: user.lastName,
					email: user.email,
					phone_number: user.phone_number,
					password: user.password,
					promo_mailing: user.promotions,
					t_c: user.agreement,
				}),
			}
		);

		if (res.status === 201) {
			const { data } = yield res.json();
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			yield fetch("/auth-api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
				}),
			});
			yield signupUserSuccess(data, property);
		}
	} catch (error) {
		console.error(error);
		yield signupUserError(error);
	}
}

function* signupUserSuccess(
	userData: { access_token: string },
	property: object
) {
	yield put({ type: actionType.SIGNUP_USER_SUCCESS });
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

function* loginUserRequest({ payload }: any) {
	const user = {
		email: payload.userData,
		password: payload.password,
	};

	try {
		const res = yield fetch(`${config.apiDomain}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: user.email,
				password: user.password,
			}),
		});

		const data = yield res.json();

		if (res.status === 201) {
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("refresh_token", data.refresh_token);
			yield fetch("/auth-api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
				}),
			});
			yield loginUserSuccess(data);
		} else {
			yield loginUserError(data.message);
		}
	} catch (error) {
		yield loginUserError(error);
	}
}

function* loginUserSuccess(userData) {
	if (window.sessionStorage.getItem("forgotLogin")) {
		const parseData = parseJwt(userData.access_token);
		const data = {
			leadId: parseData.id,
			...JSON.parse(window.sessionStorage.getItem("forgotLogin")),
		};
		yield createPropertyRequest({ payload: data });
	}

	yield put({
		type: actionType.LOGIN_USER_SUCCESS,
	});
}

function* loginUserError(error: string) {
	console.error(error);
	yield put({
		type: actionType.LOGIN_USER_ERROR,
		payload: error,
	});
}

function* contactAgencyRequest({ payload }: any) {
	try {
		const token = localStorage.getItem("access_token");
		const res = yield fetch(`${config.apiDomain}/agency/contact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer " + token,
			},
			body: JSON.stringify({ ...payload }),
		});

		if (res.status === 201) {
			yield contactAgencySuccess();
		}
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
	yield takeLatest(actionType.CONTACT_AGENCY_REQUEST, contactAgencyRequest);
	yield takeLatest(actionType.CHECK_IF_EXIST_EMAIL, checkExistEmail);
	yield takeLatest(actionType.VERIFY_EMAIL, verifyEmail);
	yield takeLatest(actionType.REMIND_PASSWORD_REQUEST, remindPasswordRequest);
	yield takeLatest(
		actionType.CHANGE_PASSWORD_REQUEST,
		sendDataForUpdatePasswordRequest
	);
}
