import { css } from '@emotion/core'
import normalize from 'emotion-normalize'

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
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  p {
    margin: 0;
  }
`

export default css`
  ${normalize}
  ${base}
  ${icofontFace}
`
