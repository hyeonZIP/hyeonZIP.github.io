import React from "react"
import { Link } from "gatsby"
import {useLocation} from "@reach/router"
import MoonIcon from "./icons/MoonIcon"
import SunIcon from "./icons/SunIcon"
import TagIcon from "./icons/TagIcon"

const Header = ({ siteTitle, theme, toggleTheme }) => {
  
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return(
  <header
    style={{
      margin: `0 auto`,
      paddingLeft: `80px`,
      paddingRight: '80px',
      height: '75px',
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      boxShadow: `1px 0.1px 5px 3px #303030`,
      // background: `#002A2E`,
    }}
  >
    <Link to="/" className="theme">
      {siteTitle}'s blog
    </Link>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div onClick={toggleTheme} style={{ cursor: 'pointer', }}>
          {theme === 'dark' ? (
            <Link><SunIcon/></Link>
          ) : (
            <Link><MoonIcon/></Link>
          )}
        </div>
        <div style={{cursor: 'pointer'}}>
          <Link to="/tag"><TagIcon/></Link>
        </div>
    </div>
  </header>
  )
}

export default Header
