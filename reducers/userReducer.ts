import * as actionType from '../actions/actionTypes';
import { parseJwt } from '../utils';

let exp = false;

/**
 * check token on expire
  */
if (typeof localStorage !== "undefined") {
  if (localStorage.getItem('auth')) {
    const jwtToken = parseJwt(localStorage.getItem('auth'));
    const dateNow = +Date.now().toString().slice(0, -3);
    exp = dateNow < jwtToken.exp;
  }
}

export const initialState = {
  auth: exp,
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