import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios';


export default class EmployeesEdit extends Component{
  
    id = this.props.match.params.id;
   

    state = {
	validationErrors:[],
	employer:{
	    id:"",
      firstname:"",
      lastname:"",
      company_id:"",
      email:"",
      phone:"",
	},
}


componentDidMount(){

	axios.get(`http://127.0.0.1:8000/api/employees/${this.id}`).then(response => {
	 const { id,firstname,lastname,company_id,email,phone } = response.data;	
	   this.setState({
	   	  employer:{
	   	  	id,
	   	    firstname,
	   	    lastname,
	   	    company_id,
	   	    email,
	   	    phone,
	   	  }
	   })		
      }).catch(error =>{
        this.props.history.push('/dashboard');
      })
}


onChange = (e) => {

  const {name,value} = e.target; 

 	this.setState({
 		employer: {
 			...this.state.employer,
 			[name]:value
 		},
 	})
 }



 edit = (e) => {
  e.preventDefault();
    

     axios.put(`http://127.0.0.1:8000/api/employees/${this.id}`,{ ...this.state.employer}).then(response => {
        if(response.status===204){
          this.props.history.push('/employees');
        } 
      }).catch(error =>{
        if(error.response.status===422){
            this.setState({
              validationErrors:Object.values(error.response.data.errors),
            })
          }
      })

  }


  render(){


 const { firstname,lastname,email,phone} = this.state.employer;
 
  	return(
     <div className='container  mt-3'>
     { (this.state.validationErrors.length>0) && 
          <div className="alert alert-danger">
            <ul>
             { 
               this.state.validationErrors.map((error,key) => <li key={key}>{error}</li>)
             }         
            </ul>
          </div>
       }
        <h2 className='text-center'>Here you can edit Employer with id {this.id}</h2>
         <form onSubmit={this.edit}>
           <div className="form-group">
    			<label htmlFor='id' className='fname'>Firstname:</label>
    			<input type="text" name='firstname' className="form-control" id="id" onChange={this.onChange}  value={ firstname } />
  		   </div>
  		   <div className="form-group">
    			<label className='fname' htmlFor='idem' >Lastname:</label>
    			<input type="text" name='lastname' className="form-control" id="idem"  onChange={this.onChange} value={ lastname } />
  		   </div>
  		   <div className="form-group">
    			<label className='fname' htmlFor='idem' >Email:</label>
    			<input type="email" name='email' className="form-control" id="idem"  onChange={this.onChange} value={ email ? email : "" } />
  		   </div>
  		   <div className="form-group">
    			<label className='fname' htmlFor='idem' >Phone:</label>
    			<input type="number" name='phone' className="form-control" id="idem"  onChange={this.onChange} value={ phone ? phone : "" } />
  		   </div>
  			 <div className="form-group">
    			<button type="submit" className="btn btn-primary mt-3">Edit</button>
    			<Link to='/dashboard' className="btn btn-danger mt-3 ml-2"> Cancel</Link>
  			 </div>
         </form>
     </div>
  		);
  }




}