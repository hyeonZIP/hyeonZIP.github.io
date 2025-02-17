import React from "react"
import { Link } from "gatsby"
import {useLocation} from "@reach/router"
import PSIcon from "./icons/PSIcon"
import BlogIcon from "./icons/BlogIcon"
import MoonIcon from "./icons/MoonIcon"
import SunIcon from "./icons/SunIcon"

const Header = ({ siteTitle, theme, toggleTheme }) => {
  
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return(
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-3) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      boxShadow: `1px 0.1px 5px 3px #303030`,
    }}
  >
    <Link
      to="/"
      style={{
        fontSize: `20px`,
        textDecoration: `none`
      }}
    >
      {siteTitle}'s blog
    </Link>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div transform="translateY(2px)">
      <Link to={isMainPage ? "/ps" : "/"}>
        {isMainPage ? (
            <PSIcon/>
        ) : (
            <BlogIcon/>
        )}
      </Link>
      </div>
        <div onClick={toggleTheme} style={{ cursor: 'pointer', }}>
          {theme === 'dark' ? (
            <SunIcon/>
          ) : (
            <MoonIcon/>
          )}
        </div>
    </div>
  </header>
  )
}

export default Header
