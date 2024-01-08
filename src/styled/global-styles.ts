import { ROOT_FOOT_SIZE } from './constants'
import focus from './focus'
import { normalize } from './normalize'

import px from './px'
import { globalCss } from './styled'

export const globalStylesObj = {
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
    // maxHeight: '100%',
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

  '::-webkit-scrollbar': {
    width: '5px' /* Width of the vertical scrollbar */,
    height: '5px' /* Height of the horizontal scrollbar */,
  },

  /* Track of the scrollbar */
  '::-webkit-scrollbar-track': {
    background: 'transparent' /* Color of the tracking area */,
    borderRadius: '10px' /* Roundness of the tracking area */,
  },

  /* Handle of the scrollbar */
  '::-webkit-scrollbar-thumb': {
    background: '#797979' /* Color of the scrollbar itself */,
    borderRadius: '5px' /* Roundness of the scrollbar */,
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: '#797979' /* Color when scrollbar is hovered */,
  },

  /* Corner of the scrollbar */
  '::-webkit-scrollbar-corner': {
    background: 'transparent' /* Color of the scrollbar corner */,
  },
}

const globalStyles = globalCss(globalStylesObj)

export default globalStyles
