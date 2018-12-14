/**
 * Page Component
 *
 */

import React, { PureComponent, Fragment } from 'react'

import PropTypes from 'prop-types'
import portalStyle from './PortalStyle'

export class Html extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string
  }
  static defaultProps = {
    children: null,
    value: null
  }
  state = {
    visible: true
  }
  render() {
    return (
      <Fragment>
        {this.state.visible && this.props.value && (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.value
            }}
          />
        )}
        {this.state.visible && this.props.children}
      </Fragment>
    )
  }
}

export const markdownStyle = portalStyle
