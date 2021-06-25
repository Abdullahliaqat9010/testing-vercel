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
    console.error(error);
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
    console.error(error);
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
  const {userId, elementsOnPage} = payload;
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/users/${ userId }/property`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const data = yield res.json();
      yield getPropertyForCurrentUserSuccess(data.properties, elementsOnPage);
    }

  } catch (error) {
    yield getPropertyForCurrentUserError(error);
  }
}

function* getPropertyForCurrentUserSuccess(data: [], elementsOnPage: number) {
  if (data.length) {
    const {id} = data[data.length - 1];
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

function* getSimilarPropertyRequest(propertyId: number, page: number, limit: number) {
  try {
    const token = localStorage.getItem('auth');
    const res = yield fetch(`${ config.apiDomain }/property/${ propertyId }/similar?page=${ page }&limit=${ limit }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const similarPropertiesLocation = [];
      const {data, meta, agencies} = yield res.json();
      data.forEach(item => {
        similarPropertiesLocation.push({
          id: Number(item.id),
          lat: Number(item.lat),
          lng: Number(item.lng),
          activeOnMap: false
        });
      });
      yield getSimilarPropertySuccess(data);
      yield setSimilarPropertyPaginationInfo(meta);
      yield setSimilarPropertyLocation(similarPropertiesLocation);
      yield setSimilarPropertyByAgency(agencies);
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
      const {data} = yield res.json();
      if (data.message !== 'Not found') {
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

function* getMoreSimilarProperty({payload}: any) {
  const {limit, page, propertyId} = payload;
  yield getSimilarPropertyRequest(propertyId, page, limit);
}

function* getGoogleDataAgency() {
  const token = localStorage.getItem('auth');
  try {
    const res = yield fetch(`${ config.apiDomain }/agency/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const {data} = yield res.json();
      yield getGoogleDataAgencySuccess(data.reviews);
    }
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
  const token = localStorage.getItem('auth');
  try {
    const res = yield fetch(`${ config.apiDomain }/property/by-agency`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
      },
    });

    if (res.status === 200) {
      const {data} = yield res.json();
      yield getPropertyAgencyDataSuccess(data);
    }
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

function* getDataFromMapBox({payload}: any) {
  const {searchValue, type} = payload;
  try {
    const res = yield fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?country=BE&language=en&types=${type}&access_token=pk.eyJ1IjoibWF0dGVvZ3JhY2VmZmEiLCJhIjoiY2txYjBiZW11MDVwcjJwbm1yMmdlaGY2eSJ9.5LiTaHbs8vlwsjwAMzm1eA`);

    if (res.status === 200) {
      const listArr = [];
      const {features} = yield res.json();

      if (features.length > 0) {
        features.map(item => {
          listArr.push({
            id: item.id,
            fullAddress: type === 'place' ? item.text : item.place_name,
            location: {
              lng: item.center[0],
              lat: item.center[1]
            },
            postcode: item.context.filter(el => el.id.indexOf('postcode') !== -1)[0]?.text || '',
            place: item.context.filter(el => el.id.indexOf('place') !== -1)[0]?.text || '',
            region: item.context.filter(el => el.id.indexOf('region') !== -1)[0]?.text || '',
            locality: item.context.filter(el => el.id.indexOf('locality') !== -1)[0]?.text || '',
            street: item?.text || '',
            number: '',
            country: item.context.filter(el => el.id.indexOf('country') !== -1)[0]?.text || ''
          })
        })
      }
      yield getDataFromMapBoxSuccess(listArr);
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
  yield takeLatest(actionType.GET_USER_PROPERTY_REQUEST, getPropertyForCurrentUser);
  yield takeLatest(actionType.GET_PRICE_PROPERTY_REQUEST, getPriceProperty);
  yield takeLatest(actionType.GET_NEXT_PAGE_SIMILAR_PROPERTY, getMoreSimilarProperty);
  yield takeLatest(actionType.GET_INFO_AGENCY_FROM_GOOGLE, getGoogleDataAgency);
  yield takeLatest(actionType.GET_DATA_PROPERTIES_AGENCY, getPropertyAgencyData);
  yield takeLatest(actionType.GET_AUTOCOMPLETE_ITEMS, getDataFromMapBox);
}