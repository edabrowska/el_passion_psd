import React from 'react'

import { MainRoot, Date } from './Main.shards.js'

import Issue from '~/components/Issue'

import { MOCKED_ISSUES } from '>/__mocks__/mockData'

const Main = () => (
  <MainRoot>
    {MOCKED_ISSUES.map((issues, i) => (
      <div key={i}>
        <Date>{issues.date}</Date>
        <div>
          {issues.nodes.map(issue => <Issue key={issue.id} issue={issue} />)}
        </div>
      </div>)
    )}
  </MainRoot>
)

export default Main
