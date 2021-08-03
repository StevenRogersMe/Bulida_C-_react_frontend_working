const BREAK_VALUES = {
  MOBILE: 0,
  PHABLET: 440,
  TABLET: 768,
  DESKTOP: 1200,
};

export const breaks = {
  mobile: BREAK_VALUES.MOBILE,
  phablet: BREAK_VALUES.PHABLET,
  tablet: BREAK_VALUES.TABLET,
  desktop: BREAK_VALUES.DESKTOP,
};

const mobile = `(min-width: ${BREAK_VALUES.MOBILE}px) and (max-width: ${BREAK_VALUES.PHABLET - 0.02}px)`;
const phablet = `(min-width: ${BREAK_VALUES.PHABLET}px) and (max-width: ${BREAK_VALUES.TABLET - 0.02}px)`;
const tablet = `(min-width: ${BREAK_VALUES.TABLET}px) and (max-width: ${BREAK_VALUES.DESKTOP - 0.02}px)`;
const desktop = `(min-width: ${BREAK_VALUES.DESKTOP}px)`;

export const devices = {
  mobile,
  phablet,
  tablet,
  desktop,
  nonMobile: `${phablet}, ${tablet}, ${desktop}`,
  nonDesktop: `${mobile}, ${phablet}, ${tablet}`,
};
