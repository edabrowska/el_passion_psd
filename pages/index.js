import withLayout from '~/components/hoc/withLayout'
import ImageTag from '~/components/ImageTag'
import bemCx from 'bem-modifiers'

export default withLayout(() =>
  <div className='container'>
    <ImageTag src='image.jpg' style={{maxWidth: '100%'}} />
    <div className={bemCx('background-image', 'scaled')} />
    <p>This is the home page</p>
  </div>
)
