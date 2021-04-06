import * as actionType from '../actions/actionTypes';

export const initialState = {
  mainBlocks: false,
  goToDashboard: false,
  stepBlock: {
    step: 0,
    addressFromStepOne: '',
    additionalAddress: {
      street: '',
      number: '',
      zip: '',
      locality: '',
    },
    selectedProperty: '',
    propertyDetails: {
      livableArea: '',
      totalArea: '',
      numberBedrooms: 1,
      numberBathrooms: 1,
      numberLevels: 1,
    },
    userData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      promotions: false,
      agreement: false,
    },
    location: {
      lat: 40.7510674,
      lng: -74.1660403
    },
  },
  errors: '',
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
          location: {...action.payload.location},
        },
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
          additionalAddress: {...action.payload},
        },
      };
      case actionType.CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        goToDashboard: true
      };
    case actionType.SET_PROPERTY_DETAILS:
      return {
        ...state,
        stepBlock: {
          ...state.stepBlock,
          propertyDetails: {...action.payload},
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
          userData: {...action.payload},
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default stepsReducer;