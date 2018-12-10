/* global jest */
import React from 'react'

const react_i18next = {}
const translate = () => Component => props => <Component t={() => ''} {...props} />
react_i18next.translate = translate

export default () => jest.mock('react-i18next', () => react_i18next)
