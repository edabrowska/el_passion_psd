import { css } from '@emotion/core'
import normalize from 'emotion-normalize'

import { primary, text } from '~/styles/colors'
import { fonts } from '~/styles/commons'
import { icofontFace } from '~/styles/icofont'

const base = css`
  * {
    border: none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%; //== 10px (so that 1rem == 10px)
  }
  
  body {
    color: ${text.primary};
    font: normal 1.6rem / 1.5 ${fonts.main};
  }
  
  a {
    color: ${primary.main};
    text-decoration: none;
  
    &:hover,
    &:active,
    &:focus {
      color: ${primary.main};
      text-decoration: underline;
    }
  }
`

const layout = css`
  
`

export default css`
  ${normalize}
  ${base}
  ${layout}
  ${icofontFace}
`
