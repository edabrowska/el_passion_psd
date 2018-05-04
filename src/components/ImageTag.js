import cx from 'classnames'
import { getStaticFilePath, getRasterImagePath, isSVG } from '~/utils/helpers'

export default ({src, className, full, ...props}) => {
  const source = getStaticFilePath(`assets/${src}`)
  return (
    <img
      {...props}
      className={cx(className, {'w--100p': full})}
      src={source}
      srcSet={isSVG(src) ? '' : `${source} 1x, ${getRasterImagePath(`${src}`)} 2x`}
    />
  )
}
