import { ExpandedTextForm } from './types';

export const firstRow = [
  { label: 'Final URL', key: 'finalUrl', required: true, outlined: true },
  { label: 'Headline one', key: 'headlineOne', outlined: true, maxlength: 30 },
  { label: 'Headline two', key: 'headlineTwo',  outlined: true, maxlength: 30 },
];

export const secondRow = [
  { label: 'Headline three', key: 'headlineThree', outlined: true, maxlength: 30 },
  { label: 'Path one', key: 'pathOne', outlined: true, maxlength: 25 },
  { label: 'Path two', key: 'pathTwo', outlined: true, maxlength: 25 },
];

export const fullRow = [
  { label: 'Description', key: 'descriptionOne', outlined: true, maxlength: 90 },
  { label: 'Description two', key: 'descriptionTwo', outlined: true, maxlength: 90 },
];

export const defaultData: ExpandedTextForm = {
  headlineOne: '',
  headlineTwo: '',
  headlineThree: '',
  descriptionOne: '',
  descriptionTwo: '',
  finalUrl: '',
  pathOne: '',
  pathTwo: '',
};

export const validationRule = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
