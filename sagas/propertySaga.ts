import { takeLatest, put } from "redux-saga/effects";
import { config } from "../config/siteConfigs";

import * as actionType from "../actions/actionTypes";
import axios from "axios";

export function* createPropertyRequest({ payload }: any) {
	try {
		yield axios.post("property", {
			...payload,
		});
		yield createPropertySuccess();
	} catch (error) {
		console.error(error);
		yield createPropertyError(error);
	}
}

function* updatePropertyRequest({ payload }: any) {
	try {
		const { data, propertyId } = payload;
		yield axios.put(`property/${propertyId}`, {
			...data,
		});
		yield updatePropertySuccess();
	} catch (error) {
		console.error(error);
		yield updatePropertyError(error);
	}
}

function* updatePropertySuccess() {
	yield put({
		type: actionType.UPDATE_PROPERTY_SUCCESS,
	});
	window.location.href = "/dashboard";
}

function* updatePropertyError(error) {
	yield put({
		type: actionType.UPDATE_PROPERTY_ERROR,
		payload: error,
	});
}

function* createPropertySuccess() {
	window.sessionStorage.removeItem("forgotLogin");
	yield put({
		type: actionType.CLEAR_STEPS_STATE,
	});
	window.location.href = "/dashboard";
}

function* createPropertyError(error) {
	yield put({
		type: actionType.CREATE_PROPERTY_ERROR,
		payload: error,
	});
}

function* getPropertyForCurrentUser({ payload }: any) {
	const { userId, elementsOnPage } = payload;
	try {
		const { data } = yield axios.get(`users/${userId}/property`);
		yield getPropertyForCurrentUserSuccess(data.properties, elementsOnPage);
	} catch (error) {
		yield getPropertyForCurrentUserError(error);
	}
}

function* getPropertyForCurrentUserSuccess(data: [], elementsOnPage: number) {
	if (data.length) {
		const { id } = data[data.length - 1];
		yield getSimilarPropertyRequest(id, 1, elementsOnPage);
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

function* getSimilarPropertyRequest(
	propertyId: number,
	page: number,
	limit: number
) {
	try {
		const { data } = yield axios.get(
			`property/${propertyId}/similar?page=${page}&limit=${limit}`
		);

		const similarPropertiesLocation = [];
		const { data: items, meta, agencies } = data;
		items.forEach((item) => {
			similarPropertiesLocation.push({
				id: Number(item.id),
				lat: Number(item.lat),
				lng: Number(item.lng),
				activeOnMap: false,
			});
		});
		yield getSimilarPropertySuccess(items);
		yield setSimilarPropertyPaginationInfo(meta);
		yield setSimilarPropertyLocation(similarPropertiesLocation);
		yield setSimilarPropertyByAgency(agencies);
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

function* setSimilarPropertyPaginationInfo(meta: object) {
	yield put({
		type: actionType.SET_SIMILAR_PROPERTY_PAGINATION_INFO,
		payload: meta,
	});
}

function* setSimilarPropertyLocation(location: object[]) {
	yield put({
		type: actionType.SET_SIMILAR_PROPERTY_LOCATIONS,
		payload: location,
	});
}

function* setSimilarPropertyByAgency(agencies: object[]) {
	yield put({
		type: actionType.SET_SIMILAR_PROPERTY_BY_AGENCY,
		payload: agencies,
	});
}

function* getSimilarPropertyError(error: string) {
	console.error(error);
	yield put({
		type: actionType.GET_SIMILAR_PROPERTY_ERROR,
		payload: error,
	});
}

function* getPriceProperty({ payload }: any) {
	try {
		const { data: _data } = yield axios.get(`property/${payload}/estimation`);
		const { data } = _data;
		yield getPricePropertySuccess(data);
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

function* getMoreSimilarProperty({ payload }: any) {
	const { limit, page, propertyId } = payload;
	yield getSimilarPropertyRequest(propertyId, page, limit);
}

function* getGoogleDataAgency() {
	try {
		const { data: _data } = yield axios.get("agency/reviews");

		const { data } = _data;
		yield getGoogleDataAgencySuccess(data.reviews);
	} catch (error) {
		yield getGoogleDataAgencyError(error);
	}
}

function* getGoogleDataAgencySuccess(data) {
	yield put({
		type: actionType.GET_INFO_AGENCY_FROM_GOOGLE_SUCCESS,
		payload: data,
	});
}

function* getGoogleDataAgencyError(error: string) {
	yield put({
		type: actionType.GET_INFO_AGENCY_FROM_GOOGLE_ERROR,
		payload: error,
	});
}

function* getPropertyAgencyData() {
	try {
		const { data: _data } = yield axios.get("property/by-agency");
		const { data } = _data;
		yield getPropertyAgencyDataSuccess(data);
	} catch (error) {
		yield getPropertyAgencyDataError(error);
	}
}

function* getPropertyAgencyDataSuccess(data) {
	yield put({
		type: actionType.GET_DATA_PROPERTIES_AGENCY_SUCCESS,
		payload: data,
	});
}

function* getPropertyAgencyDataError(error: string) {
	yield put({
		type: actionType.GET_DATA_PROPERTIES_AGENCY_ERROR,
		payload: error,
	});
}

function* getDataFromMapBox({ payload }: any) {
	const { searchValue, type } = payload;
	try {
		const res = yield fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?country=BE&language=en&types=${type}&access_token=pk.eyJ1IjoibWF0dGVvZ3JhY2VmZmEiLCJhIjoiY2txYjBiZW11MDVwcjJwbm1yMmdlaGY2eSJ9.5LiTaHbs8vlwsjwAMzm1eA`
		);

		if (res.status === 200) {
			const listArr = [];
			const { features } = yield res.json();
			if (features.length > 0) {
				features.map((item) => {
					listArr.push({
						id: item.id,
						fullAddress: type === "place" ? item.text : item.place_name,
						location: {
							lng: item.center[0],
							lat: item.center[1],
						},
						postcode:
							item.context.filter((el) => el.id.indexOf("postcode") !== -1)[0]
								?.text || "",
						place:
							item.context.filter((el) => el.id.indexOf("place") !== -1)[0]
								?.text || "",
						region:
							item.context.filter((el) => el.id.indexOf("region") !== -1)[0]
								?.text || "",
						locality:
							item.context.filter((el) => el.id.indexOf("locality") !== -1)[0]
								?.text || "",
						street: item?.text || "",
						number: item?.address || "",
						country:
							item.context.filter((el) => el.id.indexOf("country") !== -1)[0]
								?.text || "",
					});
				});
			}
			yield getDataFromMapBoxSuccess(listArr);
		}
	} catch (error) {
		yield getDataFromMapBoxError(error);
	}
}

function* getDataFromDB({ payload }: any) {
	const { searchValue } = payload;
	try {
		const res = yield axios.get("limited-agency/search-by-area?address=" + searchValue);
		console.log("res", res)
		if (res.status === 200) {
			const { data } = res;
			yield getDataFromMapBoxSuccess(data);
		}
	} catch (error) {
		yield getDataFromMapBoxError(error);
	}
}

function* getDataFromMapBoxSuccess(data) {
	yield put({
		type: actionType.GET_AUTOCOMPLETE_ITEMS_SUCCESS,
		payload: data,
	});
}

function* getDataFromMapBoxError(error: string) {
	yield put({
		type: actionType.GET_AUTOCOMPLETE_ITEMS_ERROR,
		payload: error,
	});
}

export function* propertySaga() {
	yield takeLatest(actionType.CREATE_PROPERTY_REQUEST, createPropertyRequest);
	yield takeLatest(actionType.UPDATE_PROPERTY_REQUEST, updatePropertyRequest);
	yield takeLatest(
		actionType.GET_USER_PROPERTY_REQUEST,
		getPropertyForCurrentUser
	);
	yield takeLatest(actionType.GET_PRICE_PROPERTY_REQUEST, getPriceProperty);
	yield takeLatest(
		actionType.GET_NEXT_PAGE_SIMILAR_PROPERTY,
		getMoreSimilarProperty
	);
	yield takeLatest(actionType.GET_INFO_AGENCY_FROM_GOOGLE, getGoogleDataAgency);
	yield takeLatest(
		actionType.GET_DATA_PROPERTIES_AGENCY,
		getPropertyAgencyData
	);
	yield takeLatest(actionType.GET_AUTOCOMPLETE_ITEMS, getDataFromMapBox);
	yield takeLatest(actionType.GET_SEARCHED_ITEMS, getDataFromDB);
}
