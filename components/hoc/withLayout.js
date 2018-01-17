import Head from 'next/head'

import Header from '~/Header'
import stylesheet from '@/global.sass'

export default (WrappedComponent) => (props) =>
  <div>
    <Head>
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />
    </Head>
    <Header />
    <WrappedComponent {...props} />
  </div>
