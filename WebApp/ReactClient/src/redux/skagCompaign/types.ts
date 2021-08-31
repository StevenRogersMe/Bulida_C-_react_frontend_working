import {  AdGroupType } from 'src/utils/types';

export type SkagState = {
  name: '';
  budget: 0;
  exact: false;
  phrase: false;
  modifier: false;
  broad: false;
  negativePhrase: false;
  skag: true;
  stag: false;
  adGroupList: AdGroupType[];
  keywordsList: [];
  googleAccountId: undefined;
};
