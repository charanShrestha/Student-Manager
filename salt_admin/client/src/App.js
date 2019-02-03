// This project was done by me(Charan) with my mob..
// techStack: nodejs, mongodb, mongoose, express, React, sass,
// to login:  username: any ,  password: secret

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import logo from './saltlogo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Route
              path="/"
              render={routeProps => (
                <Dashboard className="dashboard" {...routeProps} />
              )}
            />

          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
