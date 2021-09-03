import { languages } from 'src/utils/languages';
import { headerTypes } from 'src/utils/headerTypes';
import { AdType, SnippetExtensionType } from 'src/utils/types';

export const firstRow = [
  {
    label: 'Header',
    key: 'language',
    required: true,
    outlined: true,
    options: languages,
  },
  {
    label: 'Header type',
    key: 'headerType',
    required: true,
    outlined: true,
    options: headerTypes,
  },
];

export const fullRow = [
  {
    label: 'Values one',
    key: 'snippetValueOne',
    required: true,
    outlined: true,
    maxlength: 90,
  },
  {
    label: 'Values two',
    key: 'snippetValueTwo',
    required: true,
    outlined: true,
    maxlength: 90,
  },
  {
    label: 'Values three',
    key: 'snippetValueThree',
    required: true,
    outlined: true,
    maxlength: 90,
  },
];

export const defaultDataSnippetExt: SnippetExtensionType = {
  id: undefined,
  adGroupId: undefined,
  language: 'en',
  adGroupName: '',
  headerType: 'se',
  snippetValueOne: '2 to 6 week',
  snippetValueTwo: 'Program',
  snippetValueThree: 'Classes Start Soon',
  type: AdType.SNIPPET,
};
