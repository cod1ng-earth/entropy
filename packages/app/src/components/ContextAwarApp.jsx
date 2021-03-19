import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './Navigation/NavBar'
import Navigation from './Navigation/Navigation'

export const ContextAwareApp = () => {
  return true ? (
    <div>
      <BrowserRouter>
          <div className="nav-bar-wrapper">
            <NavBar />
          </div>
        <main>
          <Navigation />
        </main>
      </BrowserRouter>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
