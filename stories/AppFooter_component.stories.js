import React from 'react'
import { storiesOf } from '@storybook/react'

import AppFooter from '~/components/AppFooter/AppFooterView'

import sectionDecorator from './decorators/sectionDecorator'

storiesOf('AppFooter', module)
  .addDecorator(sectionDecorator)
  .add('App footer - example.', () => (
    <AppFooter />
  ))
