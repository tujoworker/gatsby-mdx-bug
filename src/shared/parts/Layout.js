/**
 * Page Component
 *
 */

import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import Sidebar from '../menu/SidebarMenu'
import { markdownStyle } from './Markdown'
import styled from 'react-emotion'
import classnames from 'classnames'
import { SidebarMenuProvider } from '../menu/SidebarMenuContext'

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  render() {
    const { children, location } = this.props

    return (
      <SidebarMenuProvider>
        <Wrapper>
          <Sidebar location={location} showAll={false} />
          <Content tabIndex="-1" innerRef={this._ref}>
            <MaxWidth className="dnb-page-content-inner">
              {children}
              <Footer />
            </MaxWidth>
          </Content>
        </Wrapper>
      </SidebarMenuProvider>
    )
  }
}

export default Layout

const Wrapper = styled.div`
  position: relative;
  z-index: 2; /* one less than "is-overlay" */
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 50rem) {
    display: block;
  }
`

const Content = ({ className, children }) => (
  <Main className={classnames(className, markdownStyle)}>{children}</Main>
)
Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Content.defaultProps = {
  className: null
}

const Main = styled.main`
  position: relative;
  z-index: 2; /* heigher than styled.aside */

  display: flex;
  flex-grow: 1;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
  overflow: visible;

  margin-left: 30vw; /* 30vw, width of Sidebar aside */
  margin-left: var(--aside-width);
  padding: 1rem 0 2rem 0;

  background-color: LightYellow;
  border-top: 1px solid var(--color-outline-grey);
  border-left: 1px solid var(--color-outline-grey);

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media only screen and (max-width: 50rem) {
    margin-left: 0;
  }
`

const MaxWidth = styled.div`
  max-width: 100%;
  width: 50vw;
  padding: 0 2rem;

  @media only screen and (max-width: 120rem) {
    width: 100%;
    position: relative;
  }
`

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2; /* 1 heigher than aside */

  margin-top: 3rem;
  padding: 1rem 0;

  border-top: 1px solid var(--color-outline-grey);
  text-align: left;

  a {
    font-size: 0.7rem;
    margin-right: 1rem;
  }

  color: white;
  background-color: LightCoral;
`
const Footer = () => <FooterWrapper>FooterWrapper</FooterWrapper>
