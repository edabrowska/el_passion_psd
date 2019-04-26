import React from 'react'

import AppFooter from '~/components/AppFooter/AppFooterView'
import AppHeader from '~/components/AppHeader/AppHeaderView'
import { Layout, Main } from '~/hoc/withLayout.shards'

export default ({
  namespaces = ['landing'],
  layoutType = ['holy-grail']
  // you can pass your custom config & handle it in this HOC
}) => (WrappedComponent) => {
  class withLayout extends React.Component {

    static getInitialProps () {
      const namespacesRequired = ['common', ...namespaces]

      return {
        namespacesRequired
      }
    }

    render () {
      return (
        <Layout>
          <AppHeader layoutType={layoutType} />
          <Main>
            <WrappedComponent {...this.props} layoutType={layoutType} />
          </Main>
          <AppFooter layoutType={layoutType} />
        </Layout>
      )
    }
  }

  return withLayout
}
