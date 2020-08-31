import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

const Header = (props) => {
  const userAttributes = Object.values(props.currentUser).length
  const userDisplay = props.currentUser.email;

  return (
    <header>
      <h1>Rancid Tomatillos</h1>
      {props.view === "home" && !userDisplay && (
        <Link to="/login">
          <button onClick={props.setLoginView}>Login</button>
        </Link>
      )}
      {props.view === "home" && userDisplay && (
        <nav>
        <Link to="/favorites">
        <button onClick={props.setFavoritesView}>My Favorites</button>
        </Link>
          <Link to="/">
            <button onClick={props.logOut}>Log Out</button>
          </Link>
        </nav>
      )}
      {props.view === "favorites" && userDisplay && (
        <nav>
          <Link to="/">
            <button onClick={props.setHomeView}>Home</button>
          </Link>
          <Link to="/">
            <button onClick={props.logOut}>Log Out</button>
          </Link>
        </nav>
      )}
      {props.view === "login" && (
        <Link to="/">
          <button onClick={props.setHomeView}>Home</button>
        </Link>
      )}
      {props.view === "movie" && !userDisplay && (
        <nav>
          <Link to="/">
            <button onClick={props.setHomeView}>Home</button>
          </Link>
          <Link to="/login">
            <button onClick={props.setLoginView}>Login</button>
          </Link>
        </nav>
      )}
      {props.view === "movie" && userDisplay && (
        <nav>
          <Link to="/">
            <button onClick={props.setHomeView}>Home</button>
          </Link>
          <Link to="/">
            <button onClick={props.logOut}>Log Out</button>
          </Link>
          <Link to="/favorites">
            <button onClick={props.setFavoritesView}>My Favorites</button>
          </Link>
        </nav>
      )}
      {userAttributes > 0 && <p>{userDisplay}</p>}
    </header>
  );
}

export default Header
