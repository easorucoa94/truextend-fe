import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ListStudentComponent from './Student/ListStudentComponent';
import AddStudentComponent from './Student/AddStudentComponent';
import ListClassComponent from './Class/ListClassComponent';
import AddClassComponent from './Class/AddClassComponent';

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
              <Route path="/add-student" component={AddStudentComponent} />
              <Route path="/class" component={ListClassComponent} />
              <Route path="/add-class" component={AddClassComponent} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
