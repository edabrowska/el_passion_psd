import React from 'react'
import { storiesOf } from '@storybook/react'

import '../.next/static/style.css'

import ImageTag from '~/components/ImageTag'

storiesOf('ImageTag')
  .add('with logo.svg', () => (
    <ImageTag src='image.jpg' />
  ))
