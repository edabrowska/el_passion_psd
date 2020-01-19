import React from 'react'

import { MainRoot, Date, Wrapper } from './Main.shards.js'

import Issue from '~/components/Issue'

import { MOCKED_ISSUES } from '>/__mocks__/mockData'

const Main = () => (
  <MainRoot>
    <Wrapper>
      {MOCKED_ISSUES.map((issues, i) => (
        <div key={i}>
          <Date>{issues.date}</Date>
          <div>
            {issues.nodes.map(issue => <Issue key={issue.id} issue={issue} />)}
          </div>
        </div>)
      )}
    </Wrapper>
  </MainRoot>
)

export default Main
