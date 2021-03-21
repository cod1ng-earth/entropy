import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;

  @media (min-width: 1280px) {
    margin: 0 auto;
    max-width: 1200px;
  }

  & > ul {
    padding: 0;
    list-style: none;
    display: flex;
    gap: 15px;
  }
`

const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/compose">Compose</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </Nav>
  )
}

export default NavBar
