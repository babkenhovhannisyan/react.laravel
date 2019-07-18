import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../navbar/navbar';
import AdminNavbar from '../adminNavbar/adminNavbar';
import Login from '../login/login';
import Home from '../home/home';
import Dashboard from '../dashboard/dashboard';
import CompaniesCreate from '../companiesCreate/companiesCreate';
import EmployeesCreate from '../employeesCreate/employeesCreate';
import Companies from '../companies/companies';
import Employees from '../employees/employees';
import CompaniesEdit from '../companiesEdit/companiesEdit';
import EmployeesEdit from '../employeesEdit/employeesEdit';
import { createHashHistory } from 'history';
import PrivateRoute from '../privateroute/privateRoute';
import axios from 'axios';




axios.interceptors.request.use((config) => {
    let token =  sessionStorage.getItem('token');
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});




export const history = createHashHistory();

export default class Routers extends Component{

state = {
	loggedIn : false,
}



statusFilter = () => {
	this.setState({
		loggedIn:true,
	})
}


logout = () => {
  sessionStorage.removeItem('token');
  this.setState({
  	 loggedIn:false,
  });
}


componentDidMount(){
  if(sessionStorage.getItem('token')){
  	this.setState({
  		loggedIn:true,
  	})
  }
}




	render(){
		return (
		<div>
			<Router>
			 {(this.state.loggedIn === true) ? <AdminNavbar logoutFunction={this.logout} /> : <Navbar/> }
			  <Route path='/' exact component={Home} />
              <Route path='/login' exact render={ (props) => <Login {...props} check={ this.statusFilter } />} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/companies/create' exact component={CompaniesCreate} />
              <PrivateRoute path='/employees/create' exact component={EmployeesCreate} />
              <PrivateRoute path='/companies' exact component={Companies} />
              <PrivateRoute path='/employees' exact component={Employees} />
              <PrivateRoute path='/companies/:id/edit' component={CompaniesEdit} />
              <PrivateRoute path='/employees/:id/edit' component={EmployeesEdit} />
      </Router>
    </div>
			)

	}
}
