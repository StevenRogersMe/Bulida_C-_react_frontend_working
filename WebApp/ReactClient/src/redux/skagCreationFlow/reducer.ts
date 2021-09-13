import { SkagStepsState } from './types';
import { SET_STEP, REPLACE_STEP, SET_CURRENT_FORM_DATA } from './actionTypes';

import { PROGRESS_BAR_STEPS } from 'src/utils/consts';

const initialState: SkagStepsState = {
  skagSteps: PROGRESS_BAR_STEPS.skag,
  currentStep: 0,
  currentItem: null,
  currentAdTypeDetails: {},
};

const skagCreationFlow = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP: {
      return {
        ...state,
        currentStep: action.data,
      };
    }
    case REPLACE_STEP: {
      return {
        ...state,
        skagSteps: state.skagSteps.map((step, index) => {
          if (index === action.payload.index) {
            return action.payload.newStep;
          }
          return step;
        }),
      };
    }
    case SET_CURRENT_FORM_DATA: {
      return {
        ...state,
        currentItem: action.payload.currentItem,
        currentAdTypeDetails: action.payload.currentAdTypeDetails,
      };
    }
    default:
      return state;
  }
};

export default skagCreationFlow;
