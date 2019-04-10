import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from '>/i18n'
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
@withNamespaces('common')
class Index extends React.Component {
  render () {
    const { t } = this.props

    return <div>
      <h1>Main page</h1>
      <div className={bemCx('background-image', 'cover')} />
      <div>
        <h2>Static content & i18n</h2>
        <p>
          Put static text on pages like this: <b>{t('button.ok')}</b>.
          <br />
          Static strings are placed in locale/somefile.yml
          <br />
          Use this regardless of whether you think you need internationalization.
          <br />
          More info on i18next: google "i18next" and "next-i18next".
        </p>
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
