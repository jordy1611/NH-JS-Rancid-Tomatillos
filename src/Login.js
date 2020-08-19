import React, { Component } from 'react'
import Header from './Header.js'
import './Login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  updateText = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  generateCredentials = () => {
    const emailInput = this.state.email;
    const passwordInput = this.state.password;

    return {
      email: emailInput,
      password: passwordInput
    }
  }

  login = () => {
    const credentials = this.generateCredentials();

    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(data => {this.props.updateCurrentUser(data.user.id)})
      .catch(error => {
        this.setState({error: error})
      })
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
              id="email"
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
          <button onClick={this.login} type="button">Log In</button>
        </fieldset>
        {this.state.error &&
          <p>Invalid Username/Password</p>
        }
      </form>
    )
  }
}

export default Login
