import { IcoCog } from '~/styles/icofont'
import {
  Section,
  MainHeading,
  Root,
  SomeDiv,
  Image,
} from './Index.shards'
import React from 'react'
import { withTranslation } from '>/i18n'

import Icon from '-/logo.svg'
import img from '-/next.png'

import Layout from '~/components/Layout'

export const namespaces = ['landing', 'common']

const Index = ({ t }) =>
  <Layout>
    <Root>
      <MainHeading>Main page</MainHeading>
      <Image
        src={img}
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
          Static strings are placed in public/locale/namespace.json
          <br />
          Use this regardless of whether you think you need internationalization.
          <br />
          More info on i18next: google "i18next" and "next-i18next". A <a>link</a>.
        </p>
        <IcoCog />
      </Section>
    </Root>
  </Layout>

export default withTranslation(namespaces)(Index)
