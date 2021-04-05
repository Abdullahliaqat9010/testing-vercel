import * as actionType from '../actions/actionTypes';

export const initialState = {
  auth: false,
  errors: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        auth: true
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;