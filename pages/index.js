import withLayout from '~/components/hoc/withLayout'
import ImageTag from '~/components/ImageTag'
import BackgroundImage from '~/components/BackgroundImage'

export default withLayout(() =>
  <div>
    <ImageTag src='image.jpg' style={{maxWidth: '100%'}} />
    <BackgroundImage src='image.jpg' style={{width: '100px', height: '100px'}} />
    <p>this is the home page</p>
  </div>
)
