import * as actionType from '../actions/actionTypes';

export const initialState = {
  agencyInfoList: [],
  error: '',
};

const agencyReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.GET_INFO_AGENCY_FROM_GOOGLE_SUCCESS:
      return {
        ...state,
        agencyInfoList: [...state.agencyInfoList, ...action.payload],
      };
    case actionType.GET_INFO_AGENCY_FROM_GOOGLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default agencyReducers;