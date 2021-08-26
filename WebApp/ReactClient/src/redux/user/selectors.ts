import { GlobalState } from '../types';

export const getIsLoggedIn = (state: GlobalState) => state.user.isLoggedIn;
