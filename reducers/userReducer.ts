import * as actionType from '../actions/actionTypes';
import { parseJwt } from '../utils';
import { userToken } from '../config/siteConfigs';

let exp = false;
let userName = '';
let userSurname = '';
let userEmail = '';

/**
 * check [token] on expire
 */
if (typeof localStorage !== 'undefined') {
  if (localStorage.getItem('auth')) {
    const jwtToken = parseJwt(userToken);
    const dateNow = +Date.now().toString().slice(0, -3);
    exp = dateNow < jwtToken.exp;
    if (!exp) {
      localStorage.removeItem('auth');
    }

    if (jwtToken.firstname && jwtToken.lastname) {
      userName = jwtToken.firstname;
      userSurname = jwtToken.lastname;
      userEmail = jwtToken.email;
    }
  }
}

export const initialState = {
  auth: exp,
  showAgentModal: false,
  existEmail: false,
  emailVerified: false,
  agencyContactInfo: {
    title: '',
    agentName: '',
    agentSurname: '',
    agencyId: null,
  },
  properties: [],
  similarProperty: [],
  currentPropertyPrice: {},
  mainProperty: {},
  userName,
  userSurname,
  userEmail,
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
    case actionType.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true,
      };
    case actionType.SHOW_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: true,
        agencyContactInfo: {
          ...action.payload,
        },
      };
    case actionType.CONTACT_AGENCY_SUCCESS:
    case actionType.CLOSE_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: false,
        agencyContactInfo: {
          title: '',
          agentName: '',
          agentSurname: '',
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
        currentPropertyPrice: {...action.payload},
      };
    case actionType.CHECK_IF_EXIST_EMAIL_SUCCESS:
      return {
        ...state,
        existEmail: action.payload
      }
    case actionType.GET_SIMILAR_PROPERTY_SUCCESS:
      return {
        ...state,
        similarProperty: [...action.payload]
      }
    case actionType.GET_USER_PROPERTY_ERROR: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;