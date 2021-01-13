import PropTypes from 'prop-types'

function Video(props) {
  const {src, inIframe, ...videoProps} = props
  return inIframe ? (
    <iframe src={src} {...videoProps} />
  ) : (
    <video src={src} {...videoProps} />
  )
}

Video.propTypes = {
  /**
   * Video source
   */
  src: PropTypes.string.isRequired,
  /**
   * True/false to force iframe video
   */
  inIframe: PropTypes.bool
}

Video.defaultProps = {
  inIframe: false
}

export default Video
