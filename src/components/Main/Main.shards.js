import styled from '@emotion/styled'

export const MainRoot = styled.main`
  height: 500px;
  width: 500px;
  border-radius: 0 10px 10px 0;
  background-color: ${({ theme }) => theme.colors.bg.content};
  overflow-x: auto;
  padding: 11px 15px;
`

export const Date = styled.p`
  font-size: 1.2rem;
  letter-spacing: .06px;
  color: ${({ theme }) => theme.colors.text.label}
`
