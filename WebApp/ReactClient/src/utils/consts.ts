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
    value: 'expanded',
  },
  {
    label: 'Call only ad',
    value: 'call',
  },
  {
    label: 'Responsive research ad',
    value: 'responsive',
  },
  {
    label: 'Snippet extention',
    value: 'snippet',
  },
  {
    label: 'Callout extention',
    value: 'callout',
  },
];
