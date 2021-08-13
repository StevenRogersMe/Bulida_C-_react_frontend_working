export enum NOTIFICATION_VARIANT {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export const TIMEOUTS = {
  CLOSE_MODAL: 2000,
  MELIO_ME_INFO_MODAL: 2800,
  CLOSE_NOTIFICATION: 3000,
};

export const PROGRESS_BAR_STEPS = {
  skag: [
    'Start',
    'Build SKAG',
    'Ad Creator',
    'Settings',
    'Review editor',
    'Finish',
  ],
  stag: [
    'Start',
    'Build STAG',
    'Ad Creator',
    'Settings',
    'Review editor',
    'Finish',
  ],
};

export const AD_TYPES_OPTIONS = [
  {
    label: 'All types',
    value: 'all',
  },
  {
    label: 'Expanded text ad',
    value: 'expTextAdExt',
  },
  {
    label: 'Call only ad',
    value: 'callOnlyExt',
  },
  {
    label: 'Responsive research ad',
    value: 'searchExt',
  },
  {
    label: 'Snippet extention',
    value: 'snippetExt',
  },
  {
    label: 'Callout extention',
    value: 'callOutExt',
  },
];

export const TABLE_AD_TYPES = {
  expTextAdExt: 'Expanded text ad',
  callOnlyExt: 'Call only ad',
  searchExt: 'Responsive research ad',
  snippetExt: 'Snippet extention',
  callOutExt: 'Callout extention',
};
