import { Global } from '@emotion/core'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-common'
import { ThemeProvider } from 'emotion-theming'
import '@babel/polyfill'
import { appWithTranslation } from '>/i18n'
import withApolloClient from '~/hoc/withApolloClient'
import globalStyles from '~/styles/global'
import theme from '~/styles/theme/theme'

const Raven = process.env.RAVEN_URL ? require('raven-js') : null

class MyApp extends App {

  componentDidMount () {
    Raven && Raven
      .config(process.env.RAVEN_URL)
      .install()
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <>
        <Global
          styles={globalStyles}
        />
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </>
    )
  }
}

export default withApolloClient(appWithTranslation(MyApp))
