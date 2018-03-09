import React from 'react'
import cx from 'classnames'

import { getRasterImagePath } from '~/utils/helpers'

const getBgImgStyle = src => ({backgroundImage: `url(${src})`})

/**
 * On server, the pixel density of client's screen is not yet known.
 * So the background image path is set on client only.
 */
export default class BackgroundImage extends React.Component {
  state = {
    imagePath: false,
  }
  componentDidMount () {
    this.setImagePath(this.props.src)
  }
  componentWillReceiveProps ({src}) {
    if (this.props.src !== src) {
      this.setImagePath(src)
    }
  }
  setImagePath = path => this.setState({imagePath: getRasterImagePath(path)})
  render () {
    const {src, style, className, children, ...props} = this.props
    const {imagePath} = this.state
    return (
      <div
        style={{
          ...style,
          ...imagePath && getBgImgStyle(imagePath),
        }}
        className={cx('bg', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
}
