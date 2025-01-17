import {useEffect} from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import {useOnScreen} from '@s-ui/react-hooks'

const BASE_CLASS = `sui-MoleculeTabs`

const CLASS_TAB = `${BASE_CLASS}-item`
const CLASS_TAB_ICON = `${CLASS_TAB}-icon`
const CLASS_TAB_COUNT = `${CLASS_TAB}-count`

/* status */
const CLASS_TAB_ACTIVE = `is-active`
const CLASS_TAB_DISABLED = `is-disabled`

const MoleculeTab = ({
  active,
  onChange,
  disabled,
  icon,
  count,
  label,
  numTab
}) => {
  const [isIntersecting, outerRef] = useOnScreen()

  const handleChange = ev => {
    !disabled && onChange(ev, {numTab})
  }

  useEffect(() => {
    if (active && isIntersecting) {
      outerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }, [active, outerRef, isIntersecting])

  const className = cx(CLASS_TAB, {
    [CLASS_TAB_ACTIVE]: active,
    [CLASS_TAB_DISABLED]: disabled
  })
  return (
    <li className={className} onClick={handleChange} ref={outerRef}>
      {icon && <span className={CLASS_TAB_ICON}>{icon}</span>}
      {!isNaN(count) && <span className={CLASS_TAB_COUNT}>{count}</span>}
      <span>{label}</span>
    </li>
  )
}

MoleculeTab.propTypes = {
  /** Handler on Change Tabs */
  onChange: PropTypes.func,

  /** icon (React component) */
  icon: PropTypes.node,

  /** count to display */
  count: PropTypes.string,

  /** text to display */
  label: PropTypes.string,

  /** Tab number */
  numTab: PropTypes.number,

  /** is active */
  active: PropTypes.bool,

  /** is disabled */
  disabled: PropTypes.bool
}

export default MoleculeTab
