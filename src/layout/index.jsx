import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

// import menuIcon from "../content/assets/menu-icon.png"

export class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    // let header

    // if (location.pathname === rootPath) {
    //   header = (
    //     <h1
    //       style={{
    //         ...scale(1.2),
    //         marginBottom: rhythm(1.5),
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h1>
    //   )
    // } else {
    //   header = (
    //     <h3
    //       style={{
    //         fontFamily: `Montserrat, sans-serif`,
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h3>
    //   )
    // }
    return (
      <React.Fragment>
        <Top title={title} location={location} rootPath={rootPath} />
        

        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(40),
            // padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <Header title={title} location={location} rootPath={rootPath} />
          {/* <Nav location={location} rootPath={rootPath} /> */}
          <div>
          

          <main
            style={{
              // float: `left`,
              maxWidth: rhythm(25),
              margin: `0 auto`,
              fontFamily: `Noto sans`
            }}
          >
            {children}
          </main>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default Layout
