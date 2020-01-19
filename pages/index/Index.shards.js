import styled from '@emotion/styled'

export const App = styled.section`
  display: flex;
  width: 650px;
  height: 500px;
  border-radius: ${({ theme }) => theme.commons.borderRadius.big};
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 14px;
`
