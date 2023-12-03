import { ROOT_FOOT_SIZE } from './constants';
import focus from './focus';
import { normalize } from './normalize';

import px from './px';
import { globalCss } from './styled';

export const globalStylesObj = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  ...(normalize as {}),
  '*, *::after, *::before': {
    boxSizing: 'border-box',
  },
  html: {
    fontSize: px(ROOT_FOOT_SIZE),
  },

  'html, body, div#__next': {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    backgroundColor: '$bg',
    color: '$foreground',
    margin: 0,
    padding: 0,
    fontFamily: '$poppins',
  },

  '*:focus': focus.none,
  '*::selection': {
    backgroundColor: '$primary',
    color: '$bg',
  },
};

const globalStyles = globalCss(globalStylesObj);

export default globalStyles;
