import React from 'react'
import Head from 'next/head'

import Header from '~/Header'
import stylesheet from '+/global.sass'

export default (WrappedComponent) => {
  return class withLayout extends React.Component {
    render () {
      return (
        <div>
          <Head>
            <style dangerouslySetInnerHTML={{__html: stylesheet}} />
            <link rel='shortcut icon' href='/static/favicon.ico' />
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
