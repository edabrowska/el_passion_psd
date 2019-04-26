const _white = '#FFF'

export const bgCard = _white
export const bgRow = '#fafafa'

export const primary = {
  main: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), // random color because why not
  light: 'rgba(24, 165, 84, 0.1)',
  contrastText: _white,
}

export const error = {
  main: '#e61b39',
  light: 'rgba(230, 27, 57, 0.1)',
}

export const text = {
  primary: '#484848',
  secondary: '#808080',
}

export const border = {
  main: '#e3e3e3',
}
