import React, { Component } from 'react'
import Header from '../Header/Header.js'
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
    }).then(response => response.json())
      .then(data => {
        this.props.updateCurrentUser(data.user)
        if (data.user) {
          this.props.displayHomePage();
        } else {
          this.setState({ error: 'Uh oh' });
          console.log(this.state.error);
        }
      })
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
            <label htmlFor="email">Email</label>
            <input
              placeholder="email"
              type="text"
              id="email"
              onChange={this.updateText}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              placeholder="password"
              type="password"
              id="password"
              onChange={this.updateText}
            />
          </p>
          <button data-testid="login-button" onClick={this.login} type="button">Log In</button>
        </fieldset>
        {this.state.error &&
          <p>Invalid Username/Password</p>
        }
      </form>
    )
  }
}

export default Login
