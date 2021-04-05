// import * as actionType from '../actions/actionTypes';

export const initialState = {
  errors: ''
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return{
        ...state
      }
  }
}

export default userReducer;