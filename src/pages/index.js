/**
 * Main App
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Link from 'gatsby-link'

// react component
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Link to="/page">Go to the Pages</Link>
      </Fragment>
    )
  }
}
