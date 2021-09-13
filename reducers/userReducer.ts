import * as actionType from "../actions/actionTypes";

export const initialState = {
	id: null,
	firstname: "",
	lastname: "",
	email: "",
	phone_number: "",
	gender: "",
	avatar: "",
	email_verified: false,
	account_type: "",
	t_c: false,
	promo_mailing: false,
	auth: false,
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.LOGIN_USER_SUCCESS:
			return {
				...state,
				auth: true,
			};
		case actionType.LOGOUT_USER_SUCCESS:
			return {
				...initialState,
				auth: false,
			};
		case actionType.SET_USER_PROFILE:
			return {
				...state,
				...action?.payload,
				auth: true,
			};

		case actionType.UPDATE_USER_PROFILE:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
