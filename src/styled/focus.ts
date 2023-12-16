import rem from './rem';

const focus = {
  before: {
    content: '',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderWidth: '$3',
    borderColor: '$text',
    borderRadius: '$4',
    p: 1
  },
  shadow: {
    boxShadow: '0 0 0 3px $colors$foreground-light-1'
  },
  outline: {
    outlineColor: `$primary`,
    outlineWidth: rem(2),
    outlineStyle: 'solid'
  },

  none: {
    outline: 'none'
  }
} as const;

export default focus;
