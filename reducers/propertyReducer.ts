import * as actionType from "../actions/actionTypes";

export const initialState = {
	mainPropertyId: null,
};

const propertyReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.SET_MAIN_PROPERTY:
			return {
				...state,
				mainPropertyId: action.payload.id,
			};
		default:
			return state;
	}
};

export default propertyReducer;
