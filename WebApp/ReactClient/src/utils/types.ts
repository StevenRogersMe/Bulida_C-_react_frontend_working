import { AD_BUILDER_TYPE } from 'src/utils/consts';

export type AdBuilderType = {
  type: AD_BUILDER_TYPE;
};

export type CampaignType = {
  name: string;
  budget: number;
  exact: boolean;
  phrase: boolean;
  modifier: boolean;
  broad: boolean;
  negativePhrase: boolean;
  skag: boolean;
  stag: boolean;
  adGroupList: AdGroupType[];
  googleAccountId: string | null | undefined;
};

export type AdGroupType = {
  adGroup: string;
  keywords: string[];
  negatives: string[];
  snippetExt: SnippetExtensionType[];
  searchExt: RespSearchAdType[];
  callOnlyExt: CallOnlyAdType[];
  callOutExt: CallOutAdType[];
  expTextAdExt: ExpTextAdExtType[];
};

export type SnippetExtensionType = {
  id: number;
  adGroupId: number;
  language: string;
  adGroupName: string;
  headerType: string;
  snippetValues: string[];
};

export type RespSearchAdType = {
  id: number;
  descriptionOne: string;
  descriptionTwo: string;
  descriptionThree: string;
  descriptionFour: string;
  finalURL: string;
  pathOne: string;
  pathTwo: string;
  adGroupName: string;
  headLines: string[];
};

export type CallOnlyAdType = {
  id: number;
  country: string;
  phoneNumber: string;
  headlineOne: string;
  headlineTwo: string;
  descriptionOne: string;
  descriptionTwo: string;
  businessName: string;
  verificationURL: string;
  finalUrl: string;
};

export type CallOutAdType = {};

export type ExpTextAdExtType = {
  id: number;
  headlineOne: string;
  headlineTwo: string;
  headlineThree: string;
  descriptionOne: string;
  descriptionTwo: string;
  finalURL: string;
  pathOne: string;
  pathTwo: string;
};
