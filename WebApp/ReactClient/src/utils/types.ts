export type Expandable<T> = T & Record<string, any>;

export enum AdBuilderType {
  STAG = 'stag',
  SKAG = 'skag',
  AD = 'ad',
  EMPTY = 'empty',
}

export enum AdType {
  ALL = 'all',
  EXPANDED = 'expTextAdExt',
  CALL = 'callOnlyExt',
  RESPONSIVE = 'searchExt',
  SNIPPET = 'snippetExt',
  CALLOUT = 'callOutExt',
}

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
  keywordsList: string[];
  googleAccountId: string | null | undefined;
};

export type AdGroupType = {
  id: number;
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
  type: AdType.SNIPPET;
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
  type: AdType.RESPONSIVE;
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
  type: AdType.CALL;
};

export type CallOutAdType = {
  id: number;
  type: AdType.CALLOUT;
};

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
  type: AdType.EXPANDED;
};
