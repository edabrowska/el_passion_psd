import styled from '@emotion/styled'
import { mediaUp } from '~/styles/media'

export default styled.div`
  margin: 0 auto;
  padding: 0 16px;

  ${mediaUp.sm} {
    width: 750px;
    padding: 0;
  }
  ${mediaUp.md} {
    width: 970px;
  }
  ${mediaUp.lg} {
    width: 1170px;
  }
`
