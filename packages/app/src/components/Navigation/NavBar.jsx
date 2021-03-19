import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>{pathname !== '/create' && <Link to="/create">Create</Link>}</li>
      </ul>
    </nav>
  )
}

export default NavBar
