import React, { Component } from 'react';
import StudentList from '../StudentList/StudentList';
import Student from '../Student/Student';
import NewStudent from '../NewStudent/NewStudent';
import Archive from '../Archive/archive.jsx';
import { Route, Link } from 'react-router-dom';
import { CookiesProvider, withCookies, } from 'react-cookie';
import './Dashboard.scss';
import formBuilder from './formBuilder';
import validator from '../../validator';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loggedIn: false,
      user: null,
      redirect: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleNewSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = JSON.stringify(formBuilder(data));
    const output = validator(form);
    console.log(output.error);
    if (output.error !== null) {
      console.log(output.error.details);
      switch (true) {
      case output.error.details[0].message.includes('personNumber'):
        alert('Personal Number is not valid');
        break;
      case output.error.details[0].message.includes('firstName'):
        alert('First name is not valid');
        break;
      case output.error.details[0].message.includes('lastName'):
        alert('Last name is not valid');
        break;
      case output.error.details[0].message.includes('phone'):
        alert('Phone number is not valid');
        break;
      case output.error.details[0].message.includes('email'):
        alert('Email is not valid');
        break;
      case output.error.details[0].message.includes('address'):
        alert('Address is not valid');
        break;
      default:
        break;
      }
    } else {
      fetch('/api/students', { method: 'POST', body: form, headers: { 'Content-Type': 'application/json' } })
        .then(() => {
          this.setState(prevState => ({ ...prevState, redirect: true }));
        })
        .then(() => {
          this.setState(prevState => ({ ...prevState, redirect: this.props.location.state.redirect, students: [Math.random()]}));
        });
    }
  }

  handleSubmit(e) {
    const { cookies } = this.props;
    e.preventDefault();
    if (e.target.childNodes[3].value === 'secret') {
      let d = new Date();
      d.setTime(d.getTime() * 60 * 1000);
      this.setState(prevState => ({
        ...prevState,
        loggedIn: true,
      })
      );
      cookies.set('user', `${e.target.childNodes[0].value}`, { path: '/', expires: d });
    }
  }

  handleFormSubmit(e, id) {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = JSON.stringify(formBuilder(data));
    fetch(`/api/students/${id}`, { method: 'PUT', body: form, headers: { 'Content-Type': 'application/json' } })
      .then(() => {
        this.setState(prevState => ({ ...prevState, redirect: true }));
      })
      .then(() => {
        this.setState(prevState => ({ ...prevState, redirect: this.props.location.state.redirect, students: []}));
      });
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove('user');
    this.setState(prevState => ({ ...prevState, loggedIn: false, students: [Math.random()]}));
  }

  componentDidMount(){
    const { cookies } = this.props;
    if (cookies.get('user')) {
      this.setState(prevState => ({
        ...prevState,
        loggedIn: true,
      }));
    }
    this.setState(prevState => ({
      ...prevState,
      user: cookies.get('user'),
    }));

  }


  render() {
    const { cookies } = this.props;
    return (
      <CookiesProvider>
        {this.state.loggedIn === true &&
        <>
          <nav>
            <Link to="/" >Home </Link>
            <span>Welcome {cookies.get('user')}</span>
            <Link to="/" onClick={this.logout}>LogOut </Link>
          </nav> <hr />  
        </>
        }

        <div className="contentbox">
          {this.state.loggedIn === false && !cookies.get('user') ? (
            <div className="loginBox">
              <h1>Please sign in:</h1>
              <form className="login" onSubmit={e => this.handleSubmit(e)}>
                <input className="user" type="text" placeholder="username" /> <br />
                <input className="password" type="password" placeholder="password" /> <br />
                <button className="login-button">Login</button>
              </form>
            </div>
          ) : (
              <>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <StudentList {...routeProps} redirect={this.state.redirect} />
                  )}
                />
                <Route
                  path="/newStudent"
                  render={routeProps => <NewStudent {...routeProps} handleNewSubmit={(e) => this.handleNewSubmit(e)} redirect={this.state.redirect} />}
                />
                <Route
                  path="/students/:id"
                  render={(routeProps, history) => (
                    <Student user={this.state.user} {...history} {...routeProps} handleFormSubmit={(e, id) => this.handleFormSubmit(e, id)} redirect={this.state.redirect} />
                  )}
                />
                <Route
                  path="/archived"
                  render={routeProps => <Archive {...routeProps} />}
                />
              </>
          )}
          
        </div>
      </CookiesProvider>
    );
  }
}

export default withCookies(Dashboard);
