import styled from '@emotion/styled'

import image from '-/next.png'
import ImageTag from '~/components/ImageTag'

export const Root = styled.section`
  padding: 20px;
`

export const Section = styled.section`
  background: palegoldenrod;
`

export const SomeDiv = styled.div`
  background-image: url(${image});
  background-size: contain;
  height: 120px;
`

export const MainHeading = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
`

export const Image = styled(ImageTag)`
  width: 200px;
`
