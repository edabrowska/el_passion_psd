import withLayout from '~/components/hoc/withLayout'
import ImageTag from '~/components/ImageTag'

export default withLayout(() =>
  <div>
    <ImageTag src='logo.svg' />
    <p>this is the home page</p>
  </div>
)
