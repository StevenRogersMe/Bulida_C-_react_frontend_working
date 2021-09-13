import {
  SET_STEP,
  REPLACE_STEP,
  SET_CURRENT_FORM_DATA,
} from './actionTypes';

export const setSkagStep = (data: number) => {
  return {
    type: SET_STEP,
    data,
  };
};

export const replaceSkagStep = (index: number, newStep: string) => {
  return {
    type: REPLACE_STEP,
    payload: {
      index,
      newStep,
    },
  };
};

export const setCurrentFormData = (currentItem, currentAdTypeDetails) => {
  return {
    type: SET_CURRENT_FORM_DATA,
    payload: {
      currentItem,
      currentAdTypeDetails,
    }
  }
}
