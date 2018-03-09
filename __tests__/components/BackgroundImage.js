import React from 'react'
import { shallow } from 'enzyme'

import BackgroundImage from '~/components/BackgroundImage'

describe('BackgroundImage', () => {
  const imgPath = 'test.png'
  const className = 'some-class'
  const someProps = {value: 42, className}
  const wrapper = shallow(
    <BackgroundImage src={imgPath} {...someProps} />
  )
  it('renders an div tag', () => {
    expect(wrapper.type()).toEqual('div')
  })
  it('sets style attribute with backgroundImage value', () => {
    expect(wrapper.props().style.backgroundImage).toMatch(imgPath)
  })
  it('passes props', () => {
    expect(wrapper.props().value).toEqual(someProps.value)
  })
  it('passes className', () => {
    expect(wrapper.props().className).toMatch(someProps.className)
  })
})
