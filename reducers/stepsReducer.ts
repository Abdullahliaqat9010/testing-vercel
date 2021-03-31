import * as actionType from '../actions/actionTypes';

export const initialState = {
  mainBlocks: false,
  stepBlock: {
    step: 0,
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
          ...state.stepBlock,
          address: action.payload.infoFromAutoComplete,
          location: {...action.payload.location},
        },
      };
    case actionType.PREV_STEP_REQUEST:
      return {
        ...state,
        mainBlocks: state.stepBlock.step > 0,
        stepBlock: {
          ...state.stepBlock,
          step: state.stepBlock.step > 0 ? --state.stepBlock.step : 0
        }
      }
    case actionType.NEXT_STEP_REQUEST:
      return {
        ...state,
        stepBlock: {
          ...state.stepBlock,
          step: ++state.stepBlock.step
        }
      }
    default:
      return {
        ...state,
      };
  }
};

export default stepsReducer;