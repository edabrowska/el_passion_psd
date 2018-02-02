import { getStaticFilePath } from '~/utils/helpers'

export default ({src, ...props}) =>
  <img src={getStaticFilePath(`assets/${src}`)} {...props} />
