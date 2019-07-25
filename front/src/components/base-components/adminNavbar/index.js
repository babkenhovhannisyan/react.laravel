import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminNavbar extends Component {

  render() {

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">Laravel-test</Link>
          <Link className="navbar-brand" to="/companies/create">Add Company</Link>
          <Link className="navbar-brand" to="/employees/create">Add Employee</Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            </ul>

            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link className="nav-link font-weight-bold" to='/companies'>Companies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link font-weight-bold" to='/employees'>Employees</Link>
              </li>

              <li className="nav-item">
                <button className='btn btn-danger' onClick={this.props.logoutFunction}> Logout</button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}