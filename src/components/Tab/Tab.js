import React from 'react'

import {
  TabRoot,
  StyledImageTag,
  Count,
  Wrapper
} from './Tab.shards.js'

const Tab = ({ onClick, tab, isActive }) => {
  const { icon, title, count } = tab

  return (
    <TabRoot isActive={isActive} onClick={onClick}>
      <Wrapper>
        <StyledImageTag src={`icon-${icon}.svg`} />
        <p>{title}</p>
      </Wrapper>
      <Count>{count}</Count>
    </TabRoot>
  )
}

export default Tab
