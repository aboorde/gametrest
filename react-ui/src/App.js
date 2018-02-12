import React, { Component } from 'react';
import logo from './logo.svg';
import GametrestNavbar from './components/GametrestNavbar.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      isAuthenticated: false,
      user: null,
      token: ''
    };
  }

  setUserState (newIsAuthenticated, newUser, newToken) {
    this.setState({
      isAuthenticated: newIsAuthenticated,
      user: newUser,
      token: newToken
    })
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <GametrestNavbar
          setUserState={this.setUserState}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.user}
          token={this.state.token}
        />
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
