import * as actionType from "../actions/actionTypes";

export const initialState = {
	agencyInfoList: [],
	agencyCountPropertiesList: [],
	agencySimilarPropertiesList: [],
	error: "",
};

const agencyReducers = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.GET_INFO_AGENCY_FROM_GOOGLE_SUCCESS:
			return {
				...state,
				agencyInfoList: [...state.agencyInfoList, ...action.payload],
			};
		case actionType.GET_DATA_PROPERTIES_AGENCY_SUCCESS:
			return {
				...state,
				agencyCountPropertiesList: [
					...state.agencyCountPropertiesList,
					...action.payload,
				],
			};
		case actionType.SET_SIMILAR_PROPERTY_BY_AGENCY:
			return {
				...state,
				agencySimilarPropertiesList: [
					...state.agencySimilarPropertiesList,
					...action.payload,
				],
			};
		case actionType.GET_DATA_PROPERTIES_AGENCY_ERROR:
		case actionType.GET_INFO_AGENCY_FROM_GOOGLE_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default agencyReducers;
