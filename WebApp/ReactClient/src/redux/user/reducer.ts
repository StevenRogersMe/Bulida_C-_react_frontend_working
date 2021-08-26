import { UserState } from './types';
import { LOG_IN_USER, LOG_OUT_USER } from './actionTypes';

const initialState: UserState = {
  isLoggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_USER: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case LOG_OUT_USER: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default user;
