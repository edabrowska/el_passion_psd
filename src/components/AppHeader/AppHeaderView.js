import React from 'react'
import PropTypes from 'prop-types'

import { Root } from '~/components/AppHeader/AppHeader.shards'
import Link from '~/components/Link'
import ImageTag from '~/components/ImageTag'

const AppHeaderView = ({ layoutType }) => (
  <Root className={layoutType}>
    <Link href='/'>
      <ImageTag src='logo.svg' width='300' />
    </Link>
  </Root>
)

AppHeaderView.propTypes = {
  layoutType: PropTypes.string
}

export default AppHeaderView
