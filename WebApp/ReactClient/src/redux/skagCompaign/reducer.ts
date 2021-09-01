import { SkagState } from './types';
import {
  SET_SKAG_KEYWORDS,
  CREATE_ADS,
  UPDATE_ADS,
} from './actionTypes';

const initialState: SkagState = {
  name: '',
  budget: 0,
  exact: false,
  phrase: false,
  modifier: false,
  broad: false,
  negativePhrase: false,
  skag: true,
  stag: false,
  adGroupList: [],
  keywordsList: [],
  googleAccountId: undefined,
};

const skagCompaign = (state = initialState, action) => {
  switch (action.type) {
    case SET_SKAG_KEYWORDS: {
      return {
        ...state,
        keywordsList: action.payload.keywords,
        adGroupList: action.payload.adGroupList,
      };
    }
    case CREATE_ADS: {
      return {
        ...state,
        adGroupList: state.adGroupList.map((group) => {
          const id = group[action.payload.type].length + 1;
          group[action.payload.type].push({
            id: id,
            type: action.payload.type,
            ...action.payload.data,
          });
          return group;
        }),
      };
    }
    case UPDATE_ADS: {
      return {
        ...state,
        adGroupList: state.adGroupList.map((group) => {
          const valueIndex = group[action.payload.data.type].findIndex(
            (item) => item.id === action.payload.id
          );
          if (valueIndex !== -1) {
            group[action.payload.data.type][valueIndex] = action.payload.data;
          }
          return group;
        }),
      };
    }
    default:
      return state;
  }
};

export default skagCompaign;
