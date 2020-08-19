import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <form>
        <fieldset>
          <legend>Log In</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
            />
          </p>
          <p>
            <label htmlFor="username">Password</label>
            <input 
              type="password" 
              id="password" 
            />
          </p>
          <button>Log In</button>
        </fieldset>
      </form>
    )
  }
}

export default Login
