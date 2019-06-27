import { IcoCog } from '~/styles/icofont'
import {
  Section,
  MainHeading,
  Root,
  SomeDiv,
  Image,
} from './Index.shards'
import React from 'react'
import { withNamespaces } from '>/i18n'

import Icon from '-/logo.svg'
import Layout from '~/components/Layout'

export const namespaces = ['landing', 'common']

const Index = ({ t }) => {
  return (
    <Layout>
      <Root>
        <MainHeading>Main page</MainHeading>
        <Image
          src='next.png'
        />
        <Icon
          style={{ width: 200 }} // you can, but don't :)
        />
        <Section>
          <h2>Static content & i18n</h2>
          <SomeDiv>background image example</SomeDiv>
          <p>
          Put static text on pages like this: <b>{t('common:button.ok')}</b>.
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
    </Layout>
  )
}

export default withNamespaces(namespaces)(Index)
