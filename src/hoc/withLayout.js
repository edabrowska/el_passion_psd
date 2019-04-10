import React from 'react'
import Error from 'next/error'
import '+/main.sass'

import Header from '~/components/Header'

export default ({
  services = [],
  namespaces = [],
  // you can pass your custom config & handle it in this HOC
}) => (WrappedComponent) => {
  class withLayout extends React.Component {

    static async getInitialProps ({ store, query }) {
      let error
      const namespacesRequired = ['common', ...namespaces]

      if (services.length) {
        await Promise.all(services.map(
          service => service(query, store)
        )).catch(e => {
          error = e
        })
      }

      return {
        error,
        namespacesRequired
      }
    }

    render () {
      return (
        <>
          {this.props.error ?
            <Error statusCode={this.props.error.status} /> :
            <div>
              <Header />
              <WrappedComponent {...this.props} />
            </div>
          }
        </>
      )
    }
  }

  return withLayout
}
