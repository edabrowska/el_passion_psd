import styled from '@emotion/styled'
import { css } from '@emotion/core'

import ImageTag from '~/components/ImageTag'

export const TabRoot = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  padding: 17px 15px;
  font-size: 1.4rem;
  letter-spacing: .07px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: inherit;
  cursor: pointer;
  outline: none;

  ${({ isActive, theme }) => isActive && css`
    background-color: ${theme.colors.bg.active};
  `}

  ${({ isActive }) => !isActive && css`
    background-color: inherit;
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.active};
  }
`

export const StyledImageTag = styled(ImageTag)`
  height: 16px;
  margin-right: 9px;
`

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.text.label};
`

export const Wrapper = styled.div`
  display: flex;
`
