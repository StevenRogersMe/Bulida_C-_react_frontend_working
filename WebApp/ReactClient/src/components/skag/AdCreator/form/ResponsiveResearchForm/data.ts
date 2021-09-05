import { AdType, RespSearchAdType } from 'src/utils/types';

export const firstRow = [
  {
    label: 'Pinned to headline one',
    key: 'headlineOne',
    outlined: true,
    maxlength: 30,
  },
  {
    label: 'Pinned to headline two',
    key: 'headlineTwo',
    outlined: true,
    maxlength: 30,
  },
  {
    label: 'Pinned to headline three',
    key: 'headlineThree',
    outlined: true,
    maxlength: 30,
  },
];

export const fullRow = [
  {
    label: 'Description one',
    key: 'descriptionOne',
    outlined: true,
    maxlength: 90,
  },
  {
    label: 'Description two',
    key: 'descriptionTwo',
    outlined: true,
    maxlength: 90,
  },
];

export const secondRow = [
  { label: 'Final URL', key: 'finalUrl', outlined: true, required: true },
  { label: 'Path one', key: 'pathOne', outlined: true, maxlength: 15 },
  { label: 'Path two', key: 'pathTwo', outlined: true, maxlength: 15 },
];

export const optionalHeadlineData = {
  label: 'Optional headline',
  outlined: true,
  maxlength: 30,
};
export const optionalDescriptionData = {
  label: 'Optional description',
  outlined: true,
  maxlength: 90,
};

export const defaultDataRespResearch: RespSearchAdType = {
  id: undefined,
  headlineOne: '[Keyword]',
  headlineTwo: 'Online Store',
  optionalHeadlines: [],
  headlineThree: 'Free Delivery',
  descriptionOne: `Buy online keyword`,
  descriptionTwo: `Vast collection of keyword`,
  optionalDescriptions: [],
  finalUrl: `https://google.com/?q=_keyword_`,
  pathOne: 'shop',
  pathTwo: 'now',
  adGroupName: 'adGroupName',
  headLines: [],
  type: AdType.RESPONSIVE,
};

export const validationRuleOfUrl =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;

export const optionalDescriptions = 'optionalDescriptions';
export const optionalHeadlines = 'optionalHeadlines';
