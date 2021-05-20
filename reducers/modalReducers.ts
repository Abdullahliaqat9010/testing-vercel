import * as actionType from '../actions/actionTypes';

export const initialState = {
  showAgentModal: false,
  needVerifyEmailModal: false,
  showSuccessModal: false,
  remindPasswordModal: false,
  changePasswordModal: false,
  error: '',
};

const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionType.SHOW_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: true,
      };
    case actionType.PLEASE_VERIFY_EMAIL:
      return {
        ...state,
        needVerifyEmailModal: true,
      };
    case actionType.CLOSE_VERIFY_EMAIL_MODAL:
      return {
        ...state,
        needVerifyEmailModal: false,
      };
    case actionType.CONTACT_AGENCY_SUCCESS:
      return {
        ...state,
        showSuccessModal: true,
      };
    case actionType.CLOSE_MODAL_CONTACT_AGENT:
      return {
        ...state,
        showAgentModal: false,
        showSuccessModal: false,
      };
    case actionType.REMIND_PASSWORD_SUCCESS:
      return {
        ...state,
        remindPasswordModal: true,
      };
    case actionType.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordModal: true,
      };
    case actionType.CLOSE_REMIND_PASSWORD_MODAL:
      return {
        ...state,
        remindPasswordModal: false,
      };
    case actionType.CLOSE_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        changePasswordModal: false,
      };
    case actionType.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordModal: true,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;