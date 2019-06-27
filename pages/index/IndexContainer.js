import { Component } from 'react'
import IndexView, { namespaces } from './IndexView'

export default class IndexContainer extends Component {
  static getInitialProps () {
    return {
      namespacesRequired: namespaces
    }
  }

  render () {
    return <IndexView {...this.props} />
  }
}
