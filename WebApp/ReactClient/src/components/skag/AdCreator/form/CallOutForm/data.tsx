import { AdType, CallOutAdType } from 'src/utils/types';

export const fullRow = [
  {
    label: 'Callout text one',
    key: 'callOutTextOne',
    required: true,
    outlined: true,
    maxlength: 90,
  },
  {
    label: 'Callout text two',
    key: 'callOutTextTwo',
    required: true,
    outlined: true,
    maxlength: 90,
  },
  {
    label: 'Callout text three',
    key: 'callOutTextThree',
    required: true,
    outlined: true,
    maxlength: 90,
  },
];

export const optionalTextData = {
  label: 'Optional text',
  outlined: true,
  maxlength: 90,
};

export const defaultDataCallOutExt: CallOutAdType = {
  id: undefined,
  callOutTextOne: '2 to 6 week program',
  callOutTextTwo: 'Classes start soon',
  callOutTextThree: 'Classes start soon',
  optionalValues: [],
  type: AdType.CALLOUT,
};

export const optionalValues = 'optionalValues';
