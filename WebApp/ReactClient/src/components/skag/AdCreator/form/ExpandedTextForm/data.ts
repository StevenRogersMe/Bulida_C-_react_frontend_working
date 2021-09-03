import { AdType, ExpTextAdExtType } from 'src/utils/types';

export const firstRow = [
  { label: 'Final URL', key: 'finalUrl', required: true, outlined: true },
  { label: 'Headline one', key: 'headlineOne', outlined: true, maxlength: 30 },
  { label: 'Headline two', key: 'headlineTwo', outlined: true, maxlength: 30 },
];

export const secondRow = [
  {
    label: 'Headline three',
    key: 'headlineThree',
    outlined: true,
    maxlength: 30,
  },
  { label: 'Path one', key: 'pathOne', outlined: true, maxlength: 25 },
  { label: 'Path two', key: 'pathTwo', outlined: true, maxlength: 25 },
];

export const fullRow = [
  {
    label: 'Description',
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

export const defaultDataExpText: ExpTextAdExtType = {
  id: undefined,
  headlineOne: '[Keyword]',
  headlineTwo: '70% Off Or 2 Apparels for $24',
  headlineThree: 'New Season',
  descriptionOne:
    'Trendy & Affordable. High Quality. Daily Updates. Petite to Plus Sizes. Low Price Guarantee.',
  descriptionTwo:
    'Get Up to 80% off on Trendy & Stylish Collection of Clothing & Accessories. Shop Now.',
  finalUrl: 'https://www.google.com',
  pathOne: 'brand',
  pathTwo: 'apparel',
  type: AdType.EXPANDED,
};

export const validationRule =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
