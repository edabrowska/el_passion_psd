import React from 'react'
import Head from 'next/head'

import Header from '~/components/Header'
import stylesheet from '+/global.sass'
import { getStaticFilePath, IS_PRODUCTION } from '~/utils/helpers'
import { GLOBAL_CSS_FILENAME } from '~/../scripts/consts'

export default (WrappedComponent) => {
  return class withLayout extends React.Component {
    render () {
      return (
        <div>
          <Head>
            {IS_PRODUCTION ?
              <link rel='stylesheet' type='text/css' href={getStaticFilePath(GLOBAL_CSS_FILENAME)} />
              :
              <style dangerouslySetInnerHTML={{__html: stylesheet}} />
            }
            <link rel='shortcut icon' href={getStaticFilePath('favicon.ico')} />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <title>Spark</title>
          </Head>
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
