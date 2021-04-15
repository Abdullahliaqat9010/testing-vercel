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
})

export const sendStepsDataRequestAction = (data: object) => ({
  type: actionType.SEND_STEPS_DATA_REQUEST,
  payload: data,
});

export const modalWindowContactAgentAction = () => ({
  type: actionType.SHOW_MODAL_CONTACT_AGENT,
});

export const closeModalWindowContactAgentAction = () => ({
  type: actionType.CLOSE_MODAL_CONTACT_AGENT,
});