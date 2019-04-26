import { Global } from '@emotion/core'
import globalStyles from '~/styles/global'

export default (story) => {
  return <>
    <Global
     styles={globalStyles}
    />
    <div style={{ padding: '50px' }}>
      {story()}
    </div>
  </>
}
