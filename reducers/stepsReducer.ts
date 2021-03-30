import * as actionType from '../actions/actionTypes';

export const initialState = {
  mainBlocks: false,
  stepBlock: {
    stepTwo: false,
    stepThree: false,
    stepFour: false,
    stepFive: false,
    title: '',
    address: '',
    location: {
      lat: null,
      lng: null,
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
          stepTwo: true,
          title: action.payload.titleHeader,
          address: action.payload.infoFromAutoComplete,
          location: {...action.payload.location},
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default stepsReducer;