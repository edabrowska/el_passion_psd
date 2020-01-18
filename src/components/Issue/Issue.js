import React, { useState } from 'react'

import { IssueRoot, StyledImageTag } from './Issue.shards.js'

const Issue = ({ issue }) => {
  const [open, setOpen] = useState(issue.isOpen)
  const toggleOpen = () => setOpen(!open)

  return (
    <IssueRoot>
      <p>{issue.title}</p>
      <StyledImageTag
        src={`icon-star-${open ? 'empty' : 'full'}.svg`}
        onClick={toggleOpen}
      />
    </IssueRoot>
  )
}

export default Issue
