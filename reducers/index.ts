import { combineReducers } from "redux";

import userInfo from "./userReducer";
import modals from "./modalReducers";
import stepsInfo from "./stepsReducer";
import agency from "./agencyReducers";
import property from "./propertyReducer";

const rootReducer = combineReducers({
	userInfo,
	stepsInfo,
	modals,
	agency,
	property,
});

export default rootReducer;
