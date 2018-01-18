import React from 'react'
import { storiesOf } from '@storybook/react'

import ImageTag from '~/ImageTag'

storiesOf('ImageTag')
  .add('with logo.svg', () => (
    <ImageTag src='logo.svg' />
  ))
