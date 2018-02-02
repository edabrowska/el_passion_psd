import React from 'react'
import { shallow } from 'enzyme'

import ImageTag from '~/components/ImageTag'

describe('ImageTag', () => {
  const imgPath = 'test.png'
  const someProp = {value: 42}
  const wrapper = shallow(
    <ImageTag src={imgPath} {...someProp} />
  )
  it('renders an img tag', () => {
    expect(wrapper.type()).toEqual('img')
  })
  it('sets src attribute', () => {
    expect(wrapper.props().src).toMatch(imgPath)
  })
  it('passes props', () => {
    expect(wrapper.props().value).toEqual(someProp.value)
  })
})
