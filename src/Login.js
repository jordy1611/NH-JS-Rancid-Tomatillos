import React, { Component } from 'react'
import Header from './Header.js'
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id: 0
    };
  }

  updateText = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  login = () => {
    const emailInput = this.state.email;
    const passwordInput = this.state.password;
    const credentials = {
      email: emailInput,
      password: passwordInput
    }

    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(data => this.setState({id: data.user.id}))
      .catch(error => console.error(error))
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
      </form>
    )
  }
}

export default Login
