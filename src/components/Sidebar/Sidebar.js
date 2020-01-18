import React, { useState } from 'react'

import { SidebarRoot } from './Sidebar.shards.js'

import Navigation from '~/components/Navigation'
import Tab from '~/components/Tab'

import { MOCKED_ISSUES } from '>/__mocks__/mockData'

const allIssues = MOCKED_ISSUES.reduce((acc, curr) => acc + curr.nodes.length, 0)
const openIssues = MOCKED_ISSUES.map(issue => issue.nodes
  .reduce((acc, curr) => acc + curr.isOpen, 0))
  .reduce((acc, curr) => acc + curr, 0)
const closedIssues = MOCKED_ISSUES.map(issue => issue.nodes
  .reduce((acc, curr) => acc + !curr.isOpen, 0))
  .reduce((acc, curr) => acc + curr, 0)

const getTabs = [
  {
    icon: 'github',
    title: 'All',
    count: allIssues
  },
  {
    icon: 'open-issue',
    title: 'Open',
    count: openIssues
  },
  {
    icon: 'closed-issue',
    title: 'Closed',
    count: closedIssues
  },
]

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <SidebarRoot>
      <Navigation />
      <div>
        {getTabs.map((tab, index) => <Tab
          key={index}
          tab={tab}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        // eslint-disable-next-line react/jsx-closing-bracket-location
        />)}
      </div>
    </SidebarRoot>
  )
}

export default Sidebar
