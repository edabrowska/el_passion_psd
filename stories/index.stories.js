import React from 'react'
import { storiesOf } from '@storybook/react'

import ImageTag from '~/components/ImageTag'

storiesOf('ImageTag', module)
  .add('logo', () => (
    <ImageTag src='logo.svg' />
  ))
