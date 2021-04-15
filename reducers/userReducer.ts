import * as actionType from '../actions/actionTypes';
import { parseJwt } from '../utils';

let exp = false;
let userName = 'Anna';
let userSurname = 'Johns';

/**
 * check token on expire
 */
if (typeof localStorage !== 'undefined') {
  if (localStorage.getItem('auth')) {
    const jwtToken = parseJwt(localStorage.getItem('auth'));
    const dateNow = +Date.now().toString().slice(0, -3);
    exp = dateNow < jwtToken.exp;
    if (!exp) {
      localStorage.removeItem('auth');
    }
    console.log(jwtToken);
    if (jwtToken.firstname && jwtToken.lastname) {
      userName = jwtToken.firstname;
      userSurname = jwtToken.lastname;
    }
  }
}

export const initialState = {
  auth: exp,
  showAgentModal: false,
  userName,
  userSurname,
  errors: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.CREATE_PROPERTY_SUCCESS:
    case actionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        auth: true,
      };
    case actionType.SHOW_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: true,
      };
    case actionType.CLOSE_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;