import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import MenuIcon from '../../../content/assets/menu-icon.png'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <>
      <div className="top">
        <button className="menu"></button>
        <Link to={`/`} className="link">
          {title}
        </Link>
        <GitHubIcon />
      </div>
      {/* <div className="top-border-bottom" /> */}
    </>
  )
}
