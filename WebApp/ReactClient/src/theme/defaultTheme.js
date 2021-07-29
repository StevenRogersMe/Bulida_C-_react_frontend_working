import 'src/theme/base.css';

export const theme = {
  background: {
    default: '#F2F5FF',
    wizard: '#697EC9',
    white: '#FCFCFC',
  },
  text: {
    color: {
      main: '#202226',
      white: '#FCFCFC',
      grey: '#606473',
    },
    fontType: {
      h3: `
      font-size: 3.4rem;
      line-height: 4.2rem;
      font-weight: bold;
      `,
      h4: `
      font-size: 2.4rem;
      line-height: 3.7rem;
      font-weight: bold;
      `,
      h5: `
      font-size: 2.4rem;
      line-height: 3.7rem;
      font-weight: 600;
      `,
      body1: `
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: normal;
      `,
      body2: `
      font-size: 1.6rem;
      line-height: 2.4rem;
      font-weight: normal;
      `,
      body3: `
      font-size: 1.8rem;
      line-height: 2.8rem;
      font-weight: normal;
      `,
    },
  },
};
