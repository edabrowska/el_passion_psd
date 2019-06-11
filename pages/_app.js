import { Global } from '@emotion/core'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'emotion-theming'
import '@babel/polyfill'
import { appWithTranslation } from '>/i18n'
import withApolloClient from '~/hoc/withApolloClient'
import { getStaticFilePath } from '~/utils/helpers'
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
      <Container>
        <Global
          styles={globalStyles}
        />
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href={getStaticFilePath('favicon.ico')} />
          <link rel='manifest' href='/static/manifest.json' />
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(appWithTranslation(MyApp))
