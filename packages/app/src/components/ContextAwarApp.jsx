import React from 'react'
import { HashRouter } from 'react-router-dom'
import NavBar from './Navigation/NavBar'
import Navigation from './Navigation/Navigation'

export const ContextAwareApp = () => {
  return true ? (
    <div>
      <HashRouter>
          <div className="nav-bar-wrapper">
            <NavBar />
          </div>
        <main>
          <Navigation />
        </main>
      </HashRouter>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
