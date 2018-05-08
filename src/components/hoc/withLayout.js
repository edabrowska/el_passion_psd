import React from 'react'
import withRedux from 'next-redux-wrapper'
import '+/style.sass'
import Header from '~/components/Header'
import initStore from '~/store'
import actions from '~/store/actions'
import { ravenUrl } from '~/utils/settings'
const Raven = ravenUrl ? require('raven-js') : null

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
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
      }

      ravenUrl && Raven
        .config(ravenUrl)
        .install()
    }
    render () {
      return (
        <div>
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
  return withLayout
}
