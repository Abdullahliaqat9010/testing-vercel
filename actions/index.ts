import * as actionType from './actionTypes';

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