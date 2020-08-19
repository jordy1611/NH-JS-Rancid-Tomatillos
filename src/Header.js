import React, { Component } from 'react'
import './Header.css'

const Header = (props) => {
  return (
    <header>
      <h1>Rancid Tomatillos</h1>
      {props.view === 'home' &&
        <button onClick={props.displayLoginPage}>Login</button>
      }
      {props.view === 'login' &&
        <button onClick={props.displayHomePage}>Home</button>
      }
      {props.view === 'movie' &&
        <nav>
          <button onClick={props.displayHomePage}>Home</button>
          <button onClick={props.displayLoginPage}>Login</button>
        </nav>
      }
    </header>
  )
}

export default Header
