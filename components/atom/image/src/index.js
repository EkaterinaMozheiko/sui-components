import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { htmlImgProps } from './types'
import { ImageNotFoundIcon } from './components'

const defaultErrorText = 'Image not found'
const BASE_CLASS = 'sui-AtomImage'

const Error = (
  { className, icon: Icon, text } // eslint-disable-line react/prop-types
) => (
  <div className={className}>
    {Icon && <Icon />}
    <p>{text}</p>
  </div>
)

class AtomImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false
    }
  }

  get classNames () {
    const { loading, error } = this.state
    const { className, placeholder } = this.props
    return cx(
      BASE_CLASS,
      className,
      placeholder && `${BASE_CLASS}--placeholder`,
      `is-${loading ? 'loading' : 'loaded'}`,
      error && `is-error`
    )
  }

  handleLoad = () => {
    const { onLoad } = this.props
    this.setState({ loading: false })
    onLoad && onLoad()
  }

  handleError = () => {
    const { onError } = this.props
    this.setState({
      error: true,
      loading: false
    })
    onError && onError()
  }

  render () {
    const {
      placeholder,
      skeleton,
      bgStyles,
      spinner: Spinner,
      errorIcon,
      errorText,
      onError,
      onLoad,
      ...imgProps
    } = this.props

    const { loading, error } = this.state

    const figureStyles = {
      backgroundImage: `url(${placeholder || skeleton})`,
      ...bgStyles
    }

    return (
      <div className={this.classNames}>
        <figure
          className={`${BASE_CLASS}-figure`}
          style={!error && (placeholder || skeleton) ? figureStyles : {}}
        >
          <img
            className={`${BASE_CLASS}-image`}
            onLoad={this.handleLoad}
            onError={this.handleError}
            {...imgProps}
          />
        </figure>
        {!error &&
          loading &&
          Spinner && <Spinner className={`${BASE_CLASS}-spinner`} />}
        {error && (
          <Error
            className={`${BASE_CLASS}-error`}
            icon={errorIcon}
            text={errorText}
          />
        )}
      </div>
    )
  }
}

AtomImage.displayName = 'AtomImage'
AtomImage.propTypes = {
  /** Image url or base64 */
  src: PropTypes.string.isRequired,

  /** Description of the image */
  alt: PropTypes.string.isRequired,

  /** Image displayed (blurred) while the final image is being loaded */
  placeholder: PropTypes.string,

  /** Image (wireframe, skeleton) displayed (not blurred) while the final image is being loaded */
  skeleton: PropTypes.string,

  /** Styles passed to the element that displays the skeleton as background */
  bgStyles: PropTypes.object,

  /** Spinner (component) displayed while the final image is being loaded */
  spinner: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Icon (component) to be displayed in an Error Box when the image cannot be loaded */
  errorIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Text to be displayed in an Error Box when the image cannot be loaded */
  errorText: PropTypes.string,

  /** Function to be called when the image cannot be loaded  */
  onError: PropTypes.func,

  /** Function to be called when the image completed its loading  */
  onLoad: PropTypes.func,

  /** <img> props */
  ...htmlImgProps
}

AtomImage.defaultProps = {
  errorIcon: ImageNotFoundIcon,
  errorText: defaultErrorText
}

export default AtomImage
