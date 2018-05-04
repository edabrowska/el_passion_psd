// _document.js rendered only on ssr
import Document, { Head, Main, NextScript } from 'next/document'
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getStaticFilePath } from '~/utils/helpers'

const hash = createHash('sha256')
hash.update(readFileSync(`${process.cwd()}/.next/static/style.css`))
const version = `?${hash.digest('hex').substr(0, 8)}`

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>Spark</title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href={getStaticFilePath('favicon.ico')} />
          <link rel='stylesheet' href={`/_next/static/style.css${version}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
