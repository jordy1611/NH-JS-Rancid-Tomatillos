import React, { Component } from 'react'
import Header from './Header.js'
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  updateText = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  render(props) {
    return (
      <form>
        <fieldset>
          <legend>Log In</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              onChange={this.updateText}
            />
          </p>
          <p>
            <label htmlFor="username">Password</label>
            <input 
              type="password" 
              id="password"
              onChange={this.updateText}
            />
          </p>
          <button>Log In</button>
        </fieldset>
      </form>
    )
  }
}

export default Login
