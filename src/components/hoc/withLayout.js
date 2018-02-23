import React from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'

import Header from '~/components/Header'
import stylesheet from '+/global.sass'
import { getStaticFilePath, IS_PRODUCTION } from '~/utils/helpers'
import { GLOBAL_CSS_FILENAME } from '~/../scripts/consts'
import initStore from '~/store'
import actions from '~/store/actions'

export default (WrappedComponent) => {
  @withRedux(
    initStore,
    ({main}) => (main),
    {
      setThing: actions.setThing,
    }
  )
  class withLayout extends React.Component {
    componentDidMount () {
      this.props.setThing({number: 42})
    }
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
            <title>Spark</title>
            <link rel='manifest' href='/manifest.json' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta name='theme-color' content='#182036' />
          </Head>
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
  return withLayout
}
