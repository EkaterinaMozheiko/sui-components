import {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import MoleculeTab from './components/MoleculeTab'
import withStateActiveTab from './hoc/withStateActiveTab'

const BASE_CLASS = `sui-MoleculeTabs`

const CLASS_SCROLLER = `${BASE_CLASS}-scroller`
const CLASS_CONTENT = `${BASE_CLASS}-content`

const TYPES = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  FULLWIDTH: 'fullWidth'
}

const VARIANTS = {
  HIGHLIGHTED: 'highlighted',
  CLASSIC: 'classic'
}

const MoleculeTabs = ({variant, type, children, onChange}) => {
  const CLASS_VARIANT = `${BASE_CLASS}--${variant}`
  const CLASS_TYPE = `${BASE_CLASS}--${type}`

  const className = cx(BASE_CLASS, CLASS_VARIANT, CLASS_TYPE)

  const extendedChildren = Children.map(children, (child, index) => {
    const numTab = index + 1
    return cloneElement(child, {
      onChange,
      numTab
    })
  })

  const activeTabContent = Children.toArray(children).reduce(
    (activeContent, child) => {
      if (child) {
        const {children: childrenChild, active} = child.props
        return active ? childrenChild : activeContent
      }
    },
    null
  )

  return (
    <div className={className}>
      <ul className={CLASS_SCROLLER}>{extendedChildren}</ul>
      {activeTabContent ? (
        <div className={CLASS_CONTENT}>{activeTabContent}</div>
      ) : null}
    </div>
  )
}

MoleculeTabs.displayName = 'MoleculeTabs'

MoleculeTabs.propTypes = {
  /** children */
  children: PropTypes.any,

  /** onChange */
  onChange: PropTypes.func,

  /** variant */
  variant: PropTypes.oneOf(Object.values(VARIANTS)),

  /** type */
  type: PropTypes.oneOf(Object.values(TYPES))
}

MoleculeTabs.defaultProps = {
  variant: VARIANTS.CLASSIC,
  type: TYPES.HORIZONTAL,
  onChange: () => {}
}

const MoleculeTabsWithStateActive = withStateActiveTab(MoleculeTabs)
MoleculeTabsWithStateActive.displayName = MoleculeTabs.displayName

export default MoleculeTabsWithStateActive
export {
  MoleculeTabs,
  MoleculeTab,
  TYPES as moleculeTabsTypes,
  VARIANTS as moleculeTabsVariants
}
