import React from 'react'
import { Link } from 'gatsby'

import { Bio } from '../bio'

import './index.scss'

export const Header = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <header className="header">
        <nav className="nav">
          <div className="nav-content">
            <a>Overview</a>
            <a>spring</a>
            <a>aws</a>
            <a>git</a>
            <a>essay</a>
            <a>etc</a>
          </div>
        </nav>
      </header>
    )
  )
}