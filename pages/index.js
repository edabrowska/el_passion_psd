import withLayout from '~/components/hoc/withLayout'
import ImageTag from '~/components/ImageTag'

export default withLayout(() =>
  <div>
    <ImageTag src='image.jpg' style={{maxWidth: '100%'}} />
    <p>this is the home page</p>
  </div>
)
