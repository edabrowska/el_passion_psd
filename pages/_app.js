import App, { Container } from 'next/app'
import Head from 'next/head'
import getConfig from 'next/config'
import { Provider } from 'react-redux'

import withReduxStore from '~/hoc/withReduxStore'

import { getStaticFilePath } from '~/utils/helpers'

const { publicRuntimeConfig } = getConfig()
const Raven = publicRuntimeConfig.RAVEN_URL ? require('raven-js') : null

@withReduxStore
class MyApp extends App {

  componentDidMount () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/_next/static/service-worker.js')
    }

    Raven && Raven
      .config(publicRuntimeConfig.RAVEN_URL)
      .install()
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href={getStaticFilePath('favicon.ico')} />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp
