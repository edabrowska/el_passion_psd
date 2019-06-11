import { border } from '~/styles/theme/colors'

export const shadows = {
  medium: '0 2px 8px 0 rgba(225, 225, 225, 0.5)',
  main: '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
}

export const borders = {
  main: `1px solid ${border.main}`,
  secondary: `1px solid ${border.secondary}`
}

export const fonts = {
  main: '"Open Sans", sans-serif',
  code: '"Courier New", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Monaco", monospace'
}

export const fontSizes = {
  text: {
    extraSmall: '1.2rem',
    small: '1.4rem',
    normal: '1.6rem',
    big: '2rem',
  },
  heading: {
    mobile: {
      default: '2rem',
      secondary: '1.6rem',
    },
    desktop: {
      default: '4rem',
      secondary: '2.4rem',
    }
  },
  button: '2.4rem',
}

export const lineHeight = {
  normal: 1.5,
}
