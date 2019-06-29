import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import { Top } from "../components/top"

// import menuIcon from "../content/assets/menu-icon.png"

export class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />

      {/* <div
        style={{
          width: `100%`,
          height: `120px`,
          backgroundColor: `#F8F8F8`,
        }}
      > */}

        {/* <header>{header}</header> */}
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >

          <main>{children}</main>
          <footer style={{ fontSize: `12px` }}>
            © <a href="https://github.com/im-yeobi">im-yeobi</a>, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      {/* </div> */}
      </React.Fragment>
    )
  }
}

export default Layout
