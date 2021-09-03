import { TEXT_INPUT_SIZE, BUTTON_VARIANT, BUTTON_SIZE } from 'src/utils/consts';

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
  id?: number;
  adGroupId?: number;
  language: string;
  adGroupName: string;
  headerType: string;
  snippetValueOne: string;
  snippetValueTwo: string;
  snippetValueThree: string;
  type: AdType.SNIPPET;
};

export type SnippetExtensionFormErrors = {
  language?: string;
  headerType?: string;
  snippetValueOne?: string;
  snippetValueTwo?: string;
  snippetValueThree?: string;
};

export type RespSearchAdType = {
  id: number;
  headlineOne: string;
  headlineTwo: string;
  headlineThree: string;
  descriptionOne: string;
  descriptionTwo: string;
  finalUrl: string;
  pathOne: string;
  pathTwo: string;
  adGroupName: string;
  headLines: string[];
  type: AdType.RESPONSIVE;
};

export type CallOnlyAdType = {
  id?: number;
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

export type CallOnlyFormErrors = {
  finalUrl?: string;
  phoneNumber?: string;
  country?: string;
  verificationURL?: string;
};

export type CallOutAdType = {
  id: number;
  values: string[];
  type: AdType.CALLOUT;
};

export type ExpTextAdExtType = {
  id?: number;
  headlineOne: string;
  headlineTwo: string;
  headlineThree: string;
  descriptionOne: string;
  descriptionTwo: string;
  finalUrl: string;
  pathOne: string;
  pathTwo: string;
  type: AdType.EXPANDED;
};

export type ExpTextAdExtTypeErrors = {
  finalUrl?: string;
};

export type TextInputSize = TEXT_INPUT_SIZE.INLINE | TEXT_INPUT_SIZE.WIZARD;

export type FieldType = { id: string; value: string };

export type ButtonVariantType =
  | BUTTON_VARIANT.PRIMARY
  | BUTTON_VARIANT.SECONDARY;
export type ButtonSizeType =
  | BUTTON_SIZE.NORMAL
  | BUTTON_SIZE.SMALL
  | BUTTON_SIZE.TINY
  | BUTTON_SIZE.VERY_SMALL;

export type InputValue = {
  id: string;
  value: string;
  valueAsNumber: number;
};
