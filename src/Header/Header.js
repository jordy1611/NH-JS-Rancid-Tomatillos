import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = (props) => {
  const userAttributes = Object.values(props.currentUser).length
  const userDisplay = props.currentUser.email;

  return (
    <header>
      <h1>Rancid Tomatillos</h1>
      {props.view === "home" && userAttributes === 0 && (
        <Link to="/login">
          <button onClick={props.setLoginView}>Login</button>
        </Link>
      )}
      {props.view === "home" && userAttributes > 0 && (
        <Link to="/">
          <button onClick={props.logOut}>Log Out</button>
        </Link>
      )}
      {props.view === "login" && (
        <Link to="/">
          <button onClick={props.setHomeView}>Home</button>
        </Link>
      )}
      {props.view === "movie" && userAttributes === 0 && (
        <nav>
          <Link to="/">
            <button onClick={props.setHomeView}>Home</button>
          </Link>
          <Link to="/login">
            <button onClick={props.setLoginView}>Login</button>
          </Link>
        </nav>
      )}
      {props.view === "movie" && userAttributes > 0 && (
        <nav>
          <Link to="/">
            <button onClick={props.setHomeView}>Home</button>
          </Link>
          <Link to="/">
            <button onClick={props.logOut}>Log Out</button>
          </Link>
        </nav>
      )}
      {userAttributes > 0 && <p>{userDisplay}</p>}
    </header>
  );
}

export default Header
