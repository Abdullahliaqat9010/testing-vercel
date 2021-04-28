import * as actionType from './actionTypes';

export const userLoginAction = (data: object) => ({
  type: actionType.LOGIN_USER_REQUEST,
  payload: data,
});

export const openMainStepsAction = (data: object) => ({
  type: actionType.OPEN_MAIN_STEPS_BLOCK,
  payload: data,
});

export const goToNextStepAction = () => ({
  type: actionType.NEXT_STEP_REQUEST,
});

export const goToPrevStepAction = () => ({
  type: actionType.PREV_STEP_REQUEST,
});

export const setAdditionalAddressAction = (data: object) => ({
  type: actionType.SET_ADDITIONAL_ADDRESS,
  payload: data,
});

export const setActivePropertyAction = (propertyName: string) => ({
  type: actionType.SET_ACTIVE_PROPERTY,
  payload: propertyName,
});

export const setPropertyDetailsAction = (data: object) => ({
  type: actionType.SET_PROPERTY_DETAILS,
  payload: data,
});

export const setDetailsAction = (data: object) => ({
  type: actionType.SET_DETAILS,
  payload: data,
});

export const setUserDataAction = (data: object) => ({
  type: actionType.SET_USER_DATA,
  payload: data,
});

export const setUtilitiesDataAction = (data: object) => ({
  type: actionType.SET_UTILITIES_DATA,
  payload: data,
});

export const createPersonalAccountAction = (data: object) => ({
  type: actionType.CREATE_PERSONAL_ACCOUNT,
  payload: data,
});

export const createPropertyRequestAction = (data: object) => ({
  type: actionType.CREATE_PROPERTY_REQUEST,
  payload: data,
});

export const updatePropertyRequestAction = (data: object, propertyId) => ({
  type: actionType.UPDATE_PROPERTY_REQUEST,
  payload: {data, propertyId},
});

export const sendStepsDataRequestAction = (data: object) => ({
  type: actionType.SEND_STEPS_DATA_REQUEST,
  payload: data,
});

export const modalWindowContactAgentAction = (data: object) => ({
  type: actionType.SHOW_MODAL_CONTACT_AGENT,
  payload: data,
});

export const closeModalWindowContactAgentAction = () => ({
  type: actionType.CLOSE_MODAL_CONTACT_AGENT,
});

export const contactAgencyAction = (data: object) => ({
  type: actionType.CONTACT_AGENCY_REQUEST,
  payload: data,
});

export const getPropertyForCurrentUserAction = (userId: number) => ({
  type: actionType.GET_USER_PROPERTY_REQUEST,
  payload: userId,
});

export const getPriceForPropertyAction = (propertyId: number) => ({
  type: actionType.GET_PRICE_PROPERTY_REQUEST,
  payload: propertyId,
});

export const goToModifyPropertyAction = (property: object, propertyId: number) => ({
  type: actionType.MODIFY_PROPERTY,
  payload: {...property, propertyId},
});