import { IcoCog } from '~/styles/icofont'
import {
  Section,
  MainHeading,
  Root,
} from './index.shards'
import React from 'react'
import { withNamespaces } from '>/i18n'

import Icon from '-/logo.svg'
import ImageTag from '~/components/ImageTag'
import withLayout from '~/hoc/withLayout'

@withLayout({
  namespaces: ['landing'],
  layoutType: 'holy-grail'
})
@withNamespaces(['common', 'landing'])
export default class Index extends React.Component {
  render () {
    const { t } = this.props

    return <Root>
      <MainHeading>Main page</MainHeading>
      <ImageTag
        src='next.png'
        style={{ width: 200 }}
      />
      <Icon
        style={{ width: 200 }}
      />
      <Section>
        <h2>Static content & i18n</h2>
        <div className='image'>background image example</div>
        <p>
          Put static text on pages like this: <b>{t('button.ok')}</b>.
          <br />
          Static strings are placed in static/locale/namespace.json
          <br />
          Use this regardless of whether you think you need internationalization.
          <br />
          More info on i18next: google "i18next" and "next-i18next". A <a>link</a>.
        </p>
        <IcoCog />
      </Section>
    </Root>

  }
}
