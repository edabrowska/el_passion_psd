import { getStaticFilePath, getRasterImagePath, isSVG } from '~/utils/helpers'

export default ({ src, className, ...props }) => {
  const source = getStaticFilePath(src)
  return (
    <img
      {...props}
      className={className}
      src={source}
      srcSet={isSVG(src) ? '' : `${source} 1x, ${getRasterImagePath(`assets/${src}`)} 2x`}
    />
  )
}
