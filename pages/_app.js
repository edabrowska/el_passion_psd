import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import '@babel/polyfill'
import { appWithTranslation } from '>/i18n'
import withApolloClient from '~/hoc/withApolloClient'

import { getStaticFilePath } from '~/utils/helpers'

const Raven = process.env.RAVEN_URL ? require('raven-js') : null

class MyApp extends App {

  componentDidMount () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/_next/static/service-worker.js')
    }

    Raven && Raven
      .config(process.env.RAVEN_URL)
      .install()
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href={getStaticFilePath('favicon.ico')} />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(appWithTranslation(MyApp))
