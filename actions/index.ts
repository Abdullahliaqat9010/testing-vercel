import * as actionType from './actionTypes';

export const openMainStepsAction = (data: object) => ({
  type: actionType.OPEN_MAIN_STEPS_BLOCK,
  payload: data
})

export const goToNextStepAction = () => ({
  type: actionType.NEXT_STEP_REQUEST,
})

export const goToPrevStepAction = () => ({
  type: actionType.PREV_STEP_REQUEST,
})