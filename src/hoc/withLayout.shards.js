import styled from '@emotion/styled'

export const Layout = styled.div`
  display: grid;
  grid-template-areas: "header"
                       "content"
                       "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`

export const Main = styled.main`
  grid-area: content;
`
