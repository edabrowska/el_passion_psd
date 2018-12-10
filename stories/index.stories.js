import React from 'react'
import { storiesOf } from '@storybook/react'

import ImageTag from '~/components/ImageTag'

import sectionDecorator from './decorators/sectionDecorator'

storiesOf('ImageTag', module)
  .addDecorator(sectionDecorator)
  .add('logo', () => (
    <ImageTag src='logo.svg' />
  ))
