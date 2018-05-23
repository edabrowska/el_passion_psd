import withLayout from '~/components/hoc/withLayout'
import ImageTag from '~/components/ImageTag'

export default withLayout(() =>
  <div className='container'>
    <ImageTag src='image.jpg' style={{maxWidth: '100%'}} />
    <div className='background-image' />
    <p>This is the home page</p>
  </div>
)
