import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../navbar/navbar';
import AdminNavbar from '../adminNavbar/adminNavbar';
import Login from '../login/login';
import Home from '../home/home';
import Dashboard from '../dashboard/dashboard';
import CompaniesCreate from '../companiesCreate/companiesCreate';
import { createHashHistory } from 'history';
import PrivateRoute from '../privateroute/privateRoute';

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
            </Router>
            </div>
			)

	}
}
