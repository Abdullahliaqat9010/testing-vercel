import * as actionType from './actionTypes';

export const openMainSteps = (data: object) => ({
  type: actionType.OPEN_MAIN_STEPS_BLOCK,
  payload: data
})