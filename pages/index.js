import React from 'react'
import { connect } from 'react-redux'
import bemCx from 'bem-modifiers'

import withLayout from '~/hoc/withLayout'

import { handleFakeData } from '~/services'
import { fakeDataSelector } from '~/store/selectors'

export default
@withLayout({
  services: [handleFakeData.get],
})
@connect(
  state => ({
    fakeData: fakeDataSelector(state)
  })
)
class Index extends React.Component {
  render () {
    return <div>
      <h1>Main page</h1>
      <div className={bemCx('background-image', 'cover')} />
      <div>
        {this.props.fakeData.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  }
}
