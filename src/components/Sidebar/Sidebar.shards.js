import styled from '@emotion/styled'

export const SidebarRoot = styled.sidebar`
  height: 500px;
  width: 150px;
  background-color: ${({ theme }) => theme.colors.bg.sidebar};
  border-radius: 10px 0 0 10px;
  color: ${({ theme }) => theme.colors.text.secondary};
`
