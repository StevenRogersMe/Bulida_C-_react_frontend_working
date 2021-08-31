import { combineReducers } from 'redux';
import user from './user/reducer';
import skagCompaign from './skagCompaign/reducer';

const rootReducer = combineReducers({ user, skagCompaign });

export default rootReducer;
