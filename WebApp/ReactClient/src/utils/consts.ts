export enum AD_BUILDER_TYPE {
  STAG = 'stag',
  SKAG = 'skag',
  AD = 'ad',
  EMPTY = 'empty',
}

export const PROGRESS_BAR_STEPS = {
  skag: [
    'Start',
    'Build SKAG',
    'Ad Creator',
    'Configutator',
    'Reviewer',
    'Finish',
  ],
  stag: [
    'Start',
    'Build STAG',
    'Ad Creator',
    'Configutator',
    'Reviewer',
    'Finish',
  ],
};
