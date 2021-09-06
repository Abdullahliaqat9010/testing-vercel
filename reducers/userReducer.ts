import * as actionType from "../actions/actionTypes";

export const initialState = {
	id: null,
	userName: "",
	userSurname: "",
	userEmail: "",
	userPhone: "",
	gender: "",
	avatar: "",
	emailVerified: false,
	accountType: "",
	t_c: false,
	promo_mailing: false,
	auth: false,
	existEmail: false,
	noEstimation: false,
	agencyContactInfo: {
		title: "",
		agentName: "",
		agentSurname: "",
		agencyId: null,
	},
	properties: [], //@todo separate properties and user data
	similarProperty: [],
	similarPropertiesLocation: [],
	propertiesListInfo: {},
	currentPropertyPrice: {},
	mainProperty: {},
	errors: "",
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.LOGIN_USER_REQUEST:
			return {
				...state,
				errors: "",
			};
		case actionType.LOGOUT_USER_SUCCESS:
			return {
				...initialState,
				auth: false,
			};
		case actionType.UPDATE_USER_PROFILE:
			return {
				...state,
				...action.payload,
				errors: "",
			};
		case actionType.LOGIN_USER_SUCCESS:
			return {
				...state,
				...action.payload,
				auth: true,
			};
		case actionType.VERIFY_EMAIL_SUCCESS:
			return {
				...state,
				emailVerified: true,
			};
		case actionType.CLEAR_SIMILAR_PROPERTIES_LIST:
			return {
				...state,
				similarPropertiesLocation: [],
			};
		case actionType.NO_ESTIMATION_PROPERTY:
			return {
				...state,
				noEstimation: true,
			};
		case actionType.SHOW_MODAL_CONTACT_AGENT:
			return {
				...state,
				agencyContactInfo: {
					...action.payload,
				},
			};
		case actionType.CLOSE_MODAL_CONTACT_AGENT:
			return {
				...state,
				agencyContactInfo: {
					title: "",
					agentName: "",
					agentSurname: "",
					agencyId: null,
				},
			};
		case actionType.GET_USER_PROPERTY_SUCCESS:
			return {
				...state,
				properties: [...action.payload],
				mainProperty: action.payload[action.payload.length - 1],
			};
		case actionType.GET_PRICE_PROPERTY_SUCCESS:
			return {
				...state,
				noEstimation: false,
				currentPropertyPrice: { ...action.payload },
			};
		case actionType.CHECK_IF_EXIST_EMAIL_SUCCESS:
			return {
				...state,
				existEmail: action.payload,
			};
		case actionType.GET_SIMILAR_PROPERTY_SUCCESS:
			const changedPropertyList =
				JSON.stringify(state.similarProperty) ===
				JSON.stringify(action.payload);
			return {
				...state,
				similarProperty: !changedPropertyList
					? [...state.similarProperty, ...action.payload]
					: [...state.similarProperty],
			};
		case actionType.SET_SIMILAR_PROPERTY_PAGINATION_INFO:
			return {
				...state,
				propertiesListInfo: { ...action.payload },
			};
		case actionType.SET_SIMILAR_PROPERTY_LOCATIONS:
			return {
				...state,
				similarPropertiesLocation: [...action.payload],
			};
		case actionType.SET_ACTIVE_PROPERTY_FROM_MAP:
			return {
				...state,
				similarPropertiesLocation: [
					...state.similarPropertiesLocation.map((property) => {
						if (property.id === action.payload) {
							return { ...property, activeOnMap: true };
						}
						return { ...property, activeOnMap: false };
					}),
				],
			};
		case actionType.LOGIN_USER_ERROR:
		case actionType.GET_USER_PROPERTY_ERROR: {
			return {
				...state,
				errors: action.payload,
			};
		}
		default:
			return state;
	}
};

export default userReducer;
