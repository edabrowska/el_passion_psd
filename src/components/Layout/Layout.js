import React from 'react'

import AppFooter from '~/components/AppFooter/AppFooterView'
import AppHeader from '~/components/AppHeader/AppHeaderView'
import { Root, Main } from '~/components/Layout/Layout.shards'

const defaultComponents = {
  Footer: AppFooter,
  Header: AppHeader,
}

export default ({
  layoutType,
  components = {},
  children
}) => {
  const layoutComponents = {
    ...defaultComponents,
    ...components
  }

  const { Header, Footer } = layoutComponents

  return (
    <Root>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </Root>
  )
}
