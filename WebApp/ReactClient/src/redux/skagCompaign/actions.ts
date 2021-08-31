import { AdGroupType } from 'src/utils/types';
import {
  SET_SKAG_KEYWORDS,
  CREATE_ADS,
  UPDATE_ADS_EXP,
} from './actionTypes';

export const setSkagKeywords = (
  keywords: string[],
  adGroupList: AdGroupType[]
) => {
  return {
    type: SET_SKAG_KEYWORDS,
    payload: {
      keywords,
      adGroupList,
    },
  };
};

export const createAds = (type, data) => {
  return {
    type: CREATE_ADS,
    payload: {
      type,
      data,
    },
  };
};

export const updateAdsExp = (id, data) => {
  return {
    type: UPDATE_ADS_EXP,
    payload: {
      id,
      data,
    },
  };
};
