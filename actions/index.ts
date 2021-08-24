import * as actionType from "./actionTypes";

export const userLoginAction = (data: object) => ({
	type: actionType.LOGIN_USER_REQUEST,
	payload: data,
});

export const userLogoutAction = () => ({
	type: actionType.LOGOUT_USER_REQUEST,
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
	payload: { data, propertyId },
});

export const sendStepsDataRequestAction = (data: object) => ({
	type: actionType.SEND_STEPS_DATA_REQUEST,
	payload: data,
});

export const modalWindowContactAgentAction = (data: object) => ({
	type: actionType.SHOW_MODAL_CONTACT_AGENT,
	payload: data,
});

export const pleaseVerifyEmailAction = () => ({
	type: actionType.PLEASE_VERIFY_EMAIL,
});

export const closeVerifyEmailModalAction = () => ({
	type: actionType.CLOSE_VERIFY_EMAIL_MODAL,
});

export const closeModalWindowContactAgentAction = () => ({
	type: actionType.CLOSE_MODAL_CONTACT_AGENT,
});

export const contactAgencyAction = (data: object) => ({
	type: actionType.CONTACT_AGENCY_REQUEST,
	payload: data,
});

export const getPropertyForCurrentUserAction = (data: object) => ({
	type: actionType.GET_USER_PROPERTY_REQUEST,
	payload: data,
});

export const getPriceForPropertyAction = (propertyId: number) => ({
	type: actionType.GET_PRICE_PROPERTY_REQUEST,
	payload: propertyId,
});

export const goToModifyPropertyAction = (
	property: object,
	propertyId: number
) => ({
	type: actionType.MODIFY_PROPERTY,
	payload: { ...property, propertyId },
});

export const updateAddressList = (addressList: object) => ({
	type: actionType.UPDATE_ADDRESS_LIST,
	payload: addressList,
});

export const checkIfEmailExistAction = (email: string) => ({
	type: actionType.CHECK_IF_EXIST_EMAIL,
	payload: email,
});

export const verifyEmailAction = (token: string | string[]) => ({
	type: actionType.VERIFY_EMAIL,
	payload: token,
});

export const getMoreSimilarPropertyAction = (
	propertyId: number,
	page: number,
	limit: number
) => ({
	type: actionType.GET_NEXT_PAGE_SIMILAR_PROPERTY,
	payload: { propertyId, page, limit },
});

export const remindPasswordAction = (email: string, locale: string) => ({
	type: actionType.REMIND_PASSWORD_REQUEST,
	payload: { email, locale },
});

export const closeRemindPasswordModalAction = () => ({
	type: actionType.CLOSE_REMIND_PASSWORD_MODAL,
});

export const sendDataForUpdatePasswordAction = (
	password: string,
	token: string | string[]
) => ({
	type: actionType.CHANGE_PASSWORD_REQUEST,
	payload: { password, token },
});

export const closeChangePasswordModalAction = () => ({
	type: actionType.CLOSE_CHANGE_PASSWORD_MODAL,
});

export const getInfoAgencyAction = () => ({
	type: actionType.GET_INFO_AGENCY_FROM_GOOGLE,
});

export const getAgencyPropertyDataAction = () => ({
	type: actionType.GET_DATA_PROPERTIES_AGENCY,
});

export const setActivePropertyFromMapAction = (propertyId: number) => ({
	type: actionType.SET_ACTIVE_PROPERTY_FROM_MAP,
	payload: propertyId,
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

export const showStepsOnTheHeaderAction = () => ({
	type: actionType.SHOW_STEPS_ON_HEADER,
});
