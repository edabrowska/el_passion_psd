import React from 'react'
import { shallow } from 'enzyme'

import ImageTag from '~/components/ImageTag'

describe('ImageTag', () => {
  const imgPath = 'image.jpg'
  const someProp = {value: 42}
  const wrapper = shallow(
    <ImageTag src={imgPath} {...someProp} />
  )
  it('renders an img tag', () => {
    expect(wrapper.type()).toEqual('img')
  })
  it('passes props', () => {
    expect(wrapper.props().value).toEqual(someProp.value)
  })
})
