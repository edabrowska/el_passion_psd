import withLayout from '~/hoc/withLayout'
import ImageTag from '~/ImageTag'

export default withLayout(() =>
  <div>
    <ImageTag src='logo.svg' />
    <p>this is the home page</p>
  </div>
)
