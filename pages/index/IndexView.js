import React from 'react'

import { App } from './Index.shards'

import Layout from '~/components/Layout'
import Main from '~/components/Main'
import Sidebar from '~/components/Sidebar'

const Index = () =>
  <Layout>
    <App>
      <Sidebar />
      <Main />
    </App>
  </Layout>

export default Index
