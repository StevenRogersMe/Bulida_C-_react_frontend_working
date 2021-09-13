import { GlobalState } from '../types';

export const getSkagFlowStep = (state: GlobalState) => state.skagCreationFlow.currentStep;
export const getSkagSteps = (state: GlobalState) => state.skagCreationFlow.skagSteps;
export const getCurrentItem = (state: GlobalState) => state.skagCreationFlow.currentItem;
export const getCurrentAdTypeDetails = (state: GlobalState) => state.skagCreationFlow.currentAdTypeDetails;
