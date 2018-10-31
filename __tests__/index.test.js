/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Header from '~/components/Header.js'

describe('Header With Enzyme', () => {
  it('Header Has logo', () => {
    const app = mount(<Header />)

    expect(app.find('img').exists()).toEqual(true)
  })
})

describe('Header With Snapshot Testing', () => {
  it('Has logo', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
