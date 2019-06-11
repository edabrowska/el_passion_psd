import { css } from '@emotion/core'
import normalize from 'emotion-normalize'
import { fontSizes, lineHeight, fonts } from '~/styles/theme/commons'
import { primary, text } from '~/styles/theme/colors'

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
    font: normal ${fontSizes.text.normal} / ${lineHeight.normal} ${fonts.main};
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
