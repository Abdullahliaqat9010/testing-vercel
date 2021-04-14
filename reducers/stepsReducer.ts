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
      boxNumber: '',
      zip: '',
      locality: '',
    },
    selectedProperty: '',
    propertyDetails: {
      livingArea: '0',
      landSurface: '0',
      facadesNumber: 1,
      numberBedrooms: 1,
      numberBathrooms: 1,
      numberLevels: 1,
      gardenTerras: 0,
      gardenTerrasValue: '0',
      elevator: 0,
    },
    details: {
      prestige: 'basic',
      condition: 'new',
      constructionYear: '1998',
      renovated: 0,
      renovationYear: '2006',
      renovationLevel: '0',
    },
    utilities: {
      epc: '',
      view: 'normal',
      orientation: 'north',
      attic: false,
      atticValue: '',
      cellar: false,
      cellarValue: '',
      elevator: false,
      swimmingPool: false,
      indoorGarage: 1,
      outdoorGarage: 1,
      carport: 1,
      solarPanels: 0,
    },
    personalAccount: {
      accountType: 'private',
      selectedItem: '',
      selectedResidence: '',
      sellProperty: '',
      howSell: '',
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
    case actionType.SET_DETAILS:
      return {
        ...state,
        stepBlock: {
          ...state.stepBlock,
          details: {...action.payload},
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
    case actionType.SET_UTILITIES_DATA:
      return {
        ...state,
        stepBlock: {
          ...state.stepBlock,
          utilities: {...action.payload},
        },
      };
    case actionType.CREATE_PERSONAL_ACCOUNT:
      return {
        ...state,
        stepBlock: {
          ...state.stepBlock,
          personalAccount: {...action.payload},
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default stepsReducer;