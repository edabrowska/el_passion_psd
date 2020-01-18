import styled from '@emotion/styled'

import ImageTag from '~/components/ImageTag'

export const IssueRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 13px;
  padding-right: 11px;
  width: 465px;
  height: 40px;
  border-radius: ${({ theme }) => theme.commons.borderRadius.small};
  border: ${({ theme }) => theme.commons.borders.main};
  background-color: ${({ theme }) => theme.colors.bg.element};
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: .07px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 5px 0;
`

export const StyledImageTag = styled(ImageTag)`
  cursor: pointer;
`
