import React from 'react'
import { HashRouter } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './Navigation/NavBar'
import Navigation from './Navigation/Navigation'

const Main = styled.main`
  padding-top: 1rem;
  @media (min-width: 1280px) {
    max-width: 100vw;
  }

  @media (min-width: 1440px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`

const NavBarWrapper = styled.div`
  background-color: #1e1e1e;
`

export const ContextAwareApp = () => {
  return true ? (
    <div>
      <HashRouter>
        <NavBarWrapper>
          <NavBar />
        </NavBarWrapper>

        <Main>
          <Navigation />
        </Main>
      </HashRouter>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
