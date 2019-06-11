import styled from '@emotion/styled'

import image from '-/next.png'

export const Root = styled.section`
  padding: 20px;
`

export const Section = styled.section`
  background: palegoldenrod;

  .image { // nesting and using classes is not recommended (this is only a lazy example)
    background-image: url(${image});
    background-size: contain;
    height: 120px;
  }
`

export const MainHeading = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
`
