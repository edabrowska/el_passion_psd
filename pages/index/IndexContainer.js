import { Component } from 'react'
import IndexView from './IndexView'

export default class IndexContainer extends Component {
  render () {
    return <IndexView {...this.props} />
  }
}
