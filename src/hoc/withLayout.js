import React from 'react'
import Error from 'next/error'
import { I18nextProvider } from 'react-i18next'
import '+/main.sass'

import i18n from '~/utils/i18n'

import Header from '~/components/Header'

export default (initial = {
  services: [],
  // you can pass your custom config & handle it in this HOC
}) => (WrappedComponent) => {
  class withLayout extends React.Component {

    static async getInitialProps ({ store, query }) {
      let error
      if (initial.services.length) {
        await Promise.all(initial.services.map(
          service => service(query, store.dispatch)
        )).catch(e => {
          error = e
        })
      }
      return { error }
    }

    render () {
      return (
        <I18nextProvider i18n={i18n}>
          {this.props.error ?
            <Error statusCode={this.props.error.status} /> :
            <div>
              <Header />
              <WrappedComponent {...this.props} />
            </div>
          }
        </I18nextProvider>
      )
    }
  }

  return withLayout
}
