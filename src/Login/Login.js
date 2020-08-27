import React, { Component } from 'react';
import dataFetcher from '../dataFetcher';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      loginOk: false
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

  login = async () => {
    const credentials = this.generateCredentials();
    const loginResponse = await dataFetcher.getLoginResponse(credentials);

    if (loginResponse.user) {
      this.props.displayHomePage();
      this.props.updateCurrentUser(loginResponse.user);
      this.props.displayUserRatings();
      this.setState({loginOk: true});
    } else {
      this.setState({error: 'uh oh'});
    }
  }

  render() {
    if (this.state.loginOk === true) {
      return <Redirect to='/'/>
    }

    return (
      <form>
        <fieldset className="login-fieldset">
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
          {this.state.error &&
            <p id="error-message">Invalid Username/Password</p>
          }
        </fieldset>
      </form>
    )
  }
}

export default Login
