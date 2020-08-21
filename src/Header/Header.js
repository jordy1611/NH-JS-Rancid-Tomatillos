import React, { Component } from 'react'
import './Header.css'

const Header = (props) => {
  console.log(props.currentUser)
  const userAttributes = Object.values(props.currentUser).length
  const userDisplay = props.currentUser.name ? `user: ${props.currentUser.email}` : 'user: none'
  console.log(userDisplay)
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
      {props.view === 'movie' &&
        <nav>
          <button onClick={props.displayHomePage}>Home</button>
          <button onClick={props.displayLoginPage}>Login</button>
        </nav>
      }
      <p>{userDisplay}</p>
    </header>
  )
}

export default Header
