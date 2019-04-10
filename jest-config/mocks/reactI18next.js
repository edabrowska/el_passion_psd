/* global jest */
import React from 'react'

const react_i18next = {}
const withNamespaces = () => Component => props => <Component t={() => ''} {...props} />
react_i18next.withNamespaces = withNamespaces

export default () => jest.mock('../../i18n', () => react_i18next)
