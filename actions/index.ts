import { UserProfile } from "../types/profile";
import * as actionType from "./actionTypes";

export const userLoginSuccess = () => ({
	type: actionType.LOGIN_USER_SUCCESS,
});

export const userLogoutAction = () => ({
	type: actionType.LOGOUT_USER_REQUEST,
});

export const setUserProfile = (profile: UserProfile) => ({
	type: actionType.SET_USER_PROFILE,
	payload: profile,
});

export const updateUserProfile = (profile: UserProfile) => ({
	type: actionType.LOGIN_USER_SUCCESS,
	payload: profile,
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
	payload: { data, propertyId },
});

export const closeVerifyEmailModalAction = () => ({
	type: actionType.CLOSE_VERIFY_EMAIL_MODAL,
});

export const clearStepsStateAction = () => ({
	type: actionType.CLEAR_STEPS_STATE,
});

export const getAutocompleteItemsAction = (
	searchValue: string,
	type: string
) => ({
	type: actionType.GET_AUTOCOMPLETE_ITEMS,
	payload: { searchValue, type },
});

export const clearAutocompleteItems = () => ({
	type: actionType.CLEAR_AUTOCOMPLETE_ITEMS,
});

export const clearSimilarPropertiesLocation = () => ({
	type: actionType.CLEAR_SIMILAR_PROPERTIES_LIST,
});
