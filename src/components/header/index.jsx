import React from 'react'
import { Link } from 'gatsby'

import { Bio } from '../bio'

import './index.scss'

export const Header = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <header className="header">
        <Bio>
        </Bio>
      </header>
    )
  )
}