import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import Header from '~/Header'
import stylesheet from '@/global.sass'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{__html: stylesheet}} />
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <body>
          <Header />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
