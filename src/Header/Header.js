import React, { Component } from 'react'
import './Header.css'

const Header = (props) => {
  const userAttributes = Object.values(props.currentUser).length
  const userDisplay = props.currentUser.email;

  return (
    <header>
      <h1>Rancid Tomatillos</h1>
      {props.view === 'home' && userAttributes === 0 &&
        <button onClick={props.displayLoginPage}>Login</button>
      }
      {props.view === 'home' && userAttributes > 0 &&
        <button onClick={props.logOut}>Log Out</button>
      }
      {props.view === 'login' &&
        <button onClick={props.displayHomePage}>Home</button>
      }
      {props.view === 'movie' && userAttributes === 0 &&
        <nav>
          <button data-testid={'home'} onClick={props.displayHomePage}>Home</button>
          <button data-testid={'login'} onClick={props.displayLoginPage}>Login</button>
        </nav>
      }
      {props.view === 'movie' && userAttributes > 0 &&
        <nav>
          <button data-testid={'home'} onClick={props.displayHomePage}>Home</button>
          <button onClick={props.logOut}>Log Out</button>
        </nav>
      }
      {userAttributes > 0 && 
        <p>{userDisplay}</p>
      }
    </header>
  )
}

export default Header
