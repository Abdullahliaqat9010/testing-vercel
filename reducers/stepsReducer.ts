import * as actionType from "../actions/actionTypes";

const initData = {
	step: 0,
	addressFromStepOne: "",
	additionalAddress: {
		street: "",
		number: "",
		zip: "",
		locality: "",
		country: "",
	},
	selectedProperty: "",
	propertyDetails: {
		livingArea: "0",
		landSurface: "0",
		facadesNumber: 2,
		numberBedrooms: 1,
		numberBathrooms: 1,
		numberLevels: 1,
		numberFloors: 1,
		gardenTerrasValue: "0",
		elevator: false,
	},
	details: {
		prestige: "basic",
		condition: "renovate",
		constructionYear: "",
		renovationYear: "",
		renovationLevel: "0",
		numberFloors: 1,
	},
	utilities: {
		epc: "",
		view: "normal",
		orientation: "N",
		atticValue: "",
		cellarValue: "",
		elevator: false,
		swimmingPool: false,
		indoorGarage: 0,
		indoorGarageCheck: false,
		outdoorGarage: 0,
		outdoorGarageCheck: false,
		carport: 0,
		carportCheck: false,
		parking: false,
		solarPanels: 0,
	},
	personalAccount: {
		accountType: "private",
		selectedItem: "",
		selectedResidence: "other",
		sellProperty: "asap",
		howSell: "",
		estimationReason: "",
	},
	userData: {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		promotions: false,
		agreement: false,
	},
	location: {
		lat: null,
		lng: null,
	},
};

export const initialState = {
	mainBlocks: false,
	goToDashboard: false,
	stepBlock: { ...initData },
	dataFromMapBox: [],
	errors: "",
};

const stepsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.OPEN_MAIN_STEPS_BLOCK:
			return {
				...state,
				mainBlocks: true,
				stepBlock: {
					...state.stepBlock,
					addressFromStepOne: action.payload.infoFromAutoComplete,
					location: { ...action.payload.location },
					additionalAddress: {
						...state.stepBlock.additionalAddress,
						...action.payload.additionalAddress,
					},
				},
			};
		case actionType.CLEAR_STEPS_STATE:
			return {
				...state,
				mainBlocks: false,
				stepBlock: { ...initData },
			};
		case actionType.PREV_STEP_REQUEST:
			return {
				...state,
				mainBlocks: state.stepBlock.step > 0,
				stepBlock: {
					...state.stepBlock,
					step: state.stepBlock.step > 0 ? --state.stepBlock.step : 0,
				},
			};
		case actionType.NEXT_STEP_REQUEST:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					step: ++state.stepBlock.step,
				},
			};
		case actionType.SET_ADDITIONAL_ADDRESS:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					additionalAddress: {
						...state.stepBlock.additionalAddress,
						...action.payload,
					},
				},
			};
		case actionType.CREATE_PROPERTY_SUCCESS:
		case actionType.UPDATE_PROPERTY_SUCCESS:
		case actionType.LOGIN_USER_SUCCESS:
			return {
				...state,
				goToDashboard: true,
			};
		case actionType.SET_PROPERTY_DETAILS:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					propertyDetails: { ...action.payload },
				},
			};
		case actionType.SET_DETAILS:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					details: { ...action.payload },
				},
			};
		case actionType.SET_ACTIVE_PROPERTY:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					selectedProperty: action.payload,
				},
			};
		case actionType.SET_USER_DATA:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					userData: { ...action.payload },
				},
			};
		case actionType.SET_UTILITIES_DATA:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					utilities: { ...action.payload },
				},
			};
		case actionType.CREATE_PERSONAL_ACCOUNT:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					personalAccount: { ...action.payload },
				},
			};
		case actionType.MODIFY_PROPERTY:
			return {
				...state,
				...action.payload,
			};
		case actionType.UPDATE_ADDRESS_LIST:
			return {
				...state,
				stepBlock: {
					...state.stepBlock,
					...action.payload,
				},
			};
		case actionType.GET_AUTOCOMPLETE_ITEMS_SUCCESS:
			return {
				...state,
				dataFromMapBox: [...action.payload],
			};
		case actionType.CLEAR_AUTOCOMPLETE_ITEMS:
			return {
				...state,
				dataFromMapBox: [],
			};
		case actionType.SHOW_STEPS_ON_HEADER:
			return {
				...state,
				mainBlocks: true,
			};
		case actionType.LOGOUT_USER_SUCCESS:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default stepsReducer;
