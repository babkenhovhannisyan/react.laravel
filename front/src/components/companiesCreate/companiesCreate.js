import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './companiesCreate.css';
import axios from 'axios';




export default class CompaniesCreate extends Component{

state = {
	name:"",
	email:"",
	website:"",
}




add = (e) => {
	e.preventDefault();
	axios.post('http://127.0.0.1:8000/api/auth/companies/create',this.state).then(response => {
        console.log(response.data);
      }).catch(error =>{
        console.log(error.response);
      })
 }



onChange = (e) => {
 	this.setState({
 		[e.target.name]:e.target.value,
 	})
 }





	render(){
		return (
		 <div className='container mt-5'>
			 <h2 className="text-center">Add Company</h2>
		   <form onSubmit={this.add}>
             <div className="form-group">
    			<label htmlFor='id' className='fname'>Name:</label>
    			<input type="text" name='name' className="form-control" id="id" onChange={this.onChange} />
  			 </div>
  			 <div className="form-group">
    			<label className='fname' htmlFor='idem' >Email:</label>
    			<input type="email" name='email' className="form-control" id="idem" onChange={this.onChange} />
  			 </div>
  			 <div className="form-group">
    			<label className='fname' htmlFor='webs' >Website:</label>
    			<input type="text" name='website' className="form-control" id="webs" onChange={this.onChange} />
    			<button type="submit" className="btn btn-primary mt-3">Add</button>
    			<Link to='/dashboard' className="btn btn-danger mt-3 ml-2"> Cancel</Link>
  			 </div>
		   </form>
		 </div>
			);
	}
}




