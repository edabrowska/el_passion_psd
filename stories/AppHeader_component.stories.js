import React from 'react'
import { storiesOf } from '@storybook/react'

import AppHeader from '~/components/AppHeader/AppHeaderView'

import sectionDecorator from './decorators/sectionDecorator'

storiesOf('AppHeader', module)
  .addDecorator(sectionDecorator)
  .add('App header - example.', () => (
    <AppHeader />
  ))
