import { countries } from 'src/utils/countries';
import { AdType, CallOnlyAdType } from 'src/utils/types';

export const firstRow = [
  {
    label: 'Country',
    key: 'country',
    required: true,
    outlined: true,
    options: countries,
  },
  { label: 'Phone number', key: 'phoneNumber', required: true, outlined: true },
];

export const secondRow = [
  { label: 'Headline one', key: 'headlineOne', outlined: true, maxlength: 30 },
  { label: 'Headline two', key: 'headlineTwo', outlined: true, maxlength: 30 },
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

export const thirdRow = [
  { label: 'Display URL', key: 'finalUrl', outlined: true, required: true },
  {
    label: 'Bussines name',
    key: 'businessName',
    outlined: true,
    maxlength: 25,
  },
];

export const secondFullRow = [
  {
    label: 'Verification URL',
    key: 'verificationURL',
    outlined: true,
    required: true,
  },
];

export const defaultData: CallOnlyAdType = {
  id: undefined,
  country: '',
  phoneNumber: '',
  headlineOne: '',
  headlineTwo: '',
  descriptionOne: '',
  descriptionTwo: '',
  businessName: '',
  verificationURL: '',
  finalUrl: '',
  type: AdType.CALL,
};

export const validationRuleOfUrl =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
export const validationRuleOfPhone =
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
