import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../../base-components/navbar';
import AdminNavbar from '../../base-components/adminNavbar';
import Login from '../../../views/login';
import Home from '../../../views/home';
import Dashboard from '../../../views/dashboard';
import Companies from '../../../views/companies/list';
import CompaniesCreate from '../../../views/companies/create';
import CompaniesEdit from '../../../views/companies/edit';
import EmployeesCreate from '../../../views/employees/create';
import Employees from '../../../views/employees/list';
import EmployeesEdit from '../../../views/employees/edit';
import { createHashHistory } from 'history';
import PrivateRoute from '../privateroute';
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
