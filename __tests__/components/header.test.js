/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Header from '~/components/Header.js'

describe('Header', () => {
  it('Snapshot', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
