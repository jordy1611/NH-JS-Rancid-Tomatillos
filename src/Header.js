import React from 'react'
import './Header.css'

const Header = (props) => {
  return (
    <header>
      <h1>Rotten Tomatillos</h1>
      <button onClick={props.displayHomePage}>Home</button>
      <button onClick={props.displayLoginPage}>Login/Logout</button>
    </header>
  )
}

export default Header
