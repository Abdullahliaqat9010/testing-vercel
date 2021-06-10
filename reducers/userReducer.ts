import * as actionType from '../actions/actionTypes';
import { parseJwt } from '../utils';
import { userToken } from '../config/siteConfigs';

let exp = false;
let userName = '';
let userSurname = '';
let userEmail = '';
let userPhone = '';

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
      userPhone = jwtToken.phone_number;
    }
  }
}

export const initialState = {
  auth: exp,
  existEmail: false,
  emailVerified: false,
  noEstimation: false,
  agencyContactInfo: {
    title: '',
    agentName: '',
    agentSurname: '',
    agencyId: null,
  },
  properties: [], //@todo separate properties and user data
  similarProperty: [],
  similarPropertiesLocation: [],
  propertiesListInfo: {},
  currentPropertyPrice: {},
  mainProperty: {},
  userName,
  userSurname,
  userEmail,
  userPhone,
  errors: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.LOGIN_USER_REQUEST:
      return {
        ...state,
        errors: '',
      };
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
    case actionType.NO_ESTIMATION_PROPERTY:
      return {
        ...state,
        noEstimation: true,
      };
    case actionType.SHOW_MODAL_CONTACT_AGENT:
      return {
        ...state,
        agencyContactInfo: {
          ...action.payload,
        },
      };
    case actionType.CLOSE_MODAL_CONTACT_AGENT:
      userPhone = '';
      return {
        ...state,
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
        existEmail: action.payload,
      };
    case actionType.GET_SIMILAR_PROPERTY_SUCCESS:
      const changedPropertyList = JSON.stringify(state.similarProperty) === JSON.stringify(action.payload);
      return {
        ...state,
        similarProperty: !changedPropertyList
          ? [...state.similarProperty, ...action.payload]
          : [...state.similarProperty],
      };
    case actionType.SET_SIMILAR_PROPERTY_PAGINATION_INFO:
      return {
        ...state,
        propertiesListInfo: {...action.payload},
      };
    case actionType.SET_SIMILAR_PROPERTY_LOCATIONS:
      return {
        ...state,
        similarPropertiesLocation: [...action.payload],
      };
    case actionType.SET_ACTIVE_PROPERTY_FROM_MAP:
      return {
        ...state,
        similarPropertiesLocation: [
          ...state.similarPropertiesLocation.map(property => {
            if (property.id === action.payload) {
              return {...property, activeOnMap: true};
            }
            return {...property, activeOnMap: false};
          }),
        ],
      };
    case actionType.LOGIN_USER_ERROR:
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