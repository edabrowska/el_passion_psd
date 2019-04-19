import React from 'react'
import bemCx from 'bem-modifiers'
import '+/main.sass'

import Header from '~/components/Header'

export default ({
  namespaces = ['landing'],
  layoutType = []
  // you can pass your custom config & handle it in this HOC
}) => (WrappedComponent) => {
  class withLayout extends React.Component {

    static async getInitialProps () {
      const namespacesRequired = ['common', ...namespaces]

      return {
        namespacesRequired
      }
    }

    render () {
      return (
        <div className={bemCx('layout', layoutType)}>
          <Header layoutType={layoutType} />
          <main>
            <WrappedComponent {...this.props} layoutType={layoutType} />
          </main>
        </div>
      )
    }
  }

  return withLayout
}
