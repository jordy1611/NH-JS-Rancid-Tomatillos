import React, { Component } from 'react'
import './Header.css'

const Header = (props) => {
  const userAttributes = Object.values(props.currentUser).length

  return (
    <header>
      <h1>Rancid Tomatillos</h1>
      {props.view === 'home' && userAttributes === 0 &&
        <button onClick={props.displayLoginPage}>Login</button>
      }
      {props.view === 'home' && userAttributes > 0 &&
        <button onClick={props.displayLoginPage}>Log Out</button>
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
