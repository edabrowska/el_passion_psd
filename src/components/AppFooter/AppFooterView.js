import React from 'react'
import PropTypes from 'prop-types'

import { Root } from '~/components/AppFooter/AppFooter.shards'

const AppFooterView = ({ layoutType }) => (
  <Root className={layoutType}>
    This is the AppFooter component!
  </Root>
)

AppFooterView.propTypes = {
  layoutType: PropTypes.string
}

export default AppFooterView
