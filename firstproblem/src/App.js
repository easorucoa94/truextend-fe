import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ListStudentComponent from './Student/ListStudentComponent';
import ListClassComponent from './Class/ListClassComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/student'} className="nav-link">Students</Link></li>
                <li><Link to={'/class'} className="nav-link">Classes</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route path="/student" component={ListStudentComponent} />
              <Route path="/class" component={ListClassComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
