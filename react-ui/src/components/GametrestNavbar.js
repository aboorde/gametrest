import React, { Component } from 'react';
import logo from '../logo.svg';
import TwitterLogin from 'react-twitter-auth';
import './GametrestNavbar.scss';

class GametrestNavbar extends Component {
  onSuccess(response) {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.props.setUserState(true, user, token);
      }
    });
  };
  
  onFailed(error) {
    alert(error);
  };

  logout() {
    this.props.setUserState(false, '', null)
  }

  loginContent() {
    if (!!this.props.isAuthenticated) {
      return (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        />
      )
    }
  }

  render() {
    return (
      <header className="GametrestNavbar">
        
        <a className="GametrestNavbar__title" href='/'>Gametrest</a>
        {this.loginContent()}
      </header>
    );
  }
}

export default GametrestNavbar;