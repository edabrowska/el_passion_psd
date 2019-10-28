import { getRasterImagePath, isSVG } from '~/utils/helpers'

export default ({ src, className, ...props }) =>
  <img
    {...props}
    className={className}
    src={src}
    srcSet={isSVG(src) ? '' : `${src} 1x, ${getRasterImagePath(src)} 2x`}
  />
