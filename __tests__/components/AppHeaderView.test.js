/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import AppHeaderView from '~/components/AppHeader/AppHeaderView'

describe('AppHeaderView', () => {
  it('Snapshot', () => {
    const component = renderer.create(<AppHeaderView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
