import { LOG_IN_USER, LOG_OUT_USER } from './actionTypes';

export const saveUser = () => {
  return {
    type: LOG_IN_USER
  };
};

export const removeUser = () => {
  return {
    type: LOG_OUT_USER,
  }
};
