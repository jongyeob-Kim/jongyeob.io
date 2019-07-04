import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Footer = () => {
  return (
    <footer className="footer">
      ©<a href="https://github.com/im-yeobi">im-yeobi</a>, Built with
            {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}