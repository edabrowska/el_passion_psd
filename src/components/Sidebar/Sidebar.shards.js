import styled from '@emotion/styled'

export const SidebarRoot = styled.sidebar`
  height: 500px;
  width: 150px;
  background-color: ${({ theme }) => theme.colors.bg.sidebar};
  border-top-left-radius: ${({ theme }) => theme.commons.borderRadius.big};
  border-bottom-left-radius: ${({ theme }) => theme.commons.borderRadius.big};
  color: ${({ theme }) => theme.colors.text.secondary};
`
