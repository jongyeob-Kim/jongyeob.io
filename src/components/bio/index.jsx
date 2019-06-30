/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

import { rhythm } from "../../utils/typography"

import './index.scss'

export const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    // <div
    //   style={{
    //     display: `flex`,
    //     marginBottom: rhythm(2.5),
    //   }}
    // >
    //   <Image
    //     fixed={data.avatar.childImageSharp.fixed}
    //     alt={author}
    //     style={{
    //       marginRight: rhythm(1 / 2),
    //       marginBottom: 0,
    //       minWidth: 50,
    //       borderRadius: `100%`,
    //     }}
    //     imgStyle={{
    //       borderRadius: `50%`,
    //     }}
    //   />

    <div className="bio">
      <div className="author-image">
      </div>
      <div className="author-info">
        <a className="author-name"><strong>{author}</strong></a>
        <div className="author-description">
          Back-end developer.
        </div>
        <p>
          <a className="author-social" href={`https://github.com/${social.github}`}>
            GitHub
          </a>
        </p>
      </div>
    </div>
    // </div>
  )
}

export default Bio
