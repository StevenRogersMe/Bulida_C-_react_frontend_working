import { combineReducers } from 'redux';
import user from './user/reducer';
import skagCompaign from './skagCompaign/reducer';
import skagCreationFlow from './skagCreationFlow/reducer';

const rootReducer = combineReducers({ user, skagCompaign, skagCreationFlow });

export default rootReducer;
