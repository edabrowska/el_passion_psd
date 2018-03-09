import cx from 'classnames'

import { getStaticFilePath, getScaledImagePath, isSVG } from '~/utils/helpers'

export default ({src, className, full, ...props}) => {
  const srcPath = `assets/${src}`
  const srcRegular = getStaticFilePath(srcPath)
  return (
    <img
      {...props}
      className={cx(className, {'w--100p': full})}
      src={srcRegular}
      srcSet={isSVG(src) ? '' : `${srcRegular} 1x, ${getStaticFilePath(getScaledImagePath(srcPath))} 2x`}
    />
  )
}
