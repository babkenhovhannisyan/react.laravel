import React, { Component } from 'react';
import './employeesCreate.css';
import {Link} from 'react-router-dom';
import axios from 'axios';




export default class EmployeesCreate extends Component{


state = {
	addCompError:false,
	companies:[],
	validationErrors:[],
	firstname:"",
	lastname:"",
	company_id:"",
	email:"",
	phone:"",
	created:false,
	optionValue:false,
}





 componentWillMount(){
 	let token =  sessionStorage.getItem('token');
 	axios.get(`http://127.0.0.1:8000/api/companies?token=${token}`).then(response => {
         if(response.data[0].length === 0){
         	this.setState({
         		addCompError:true
         	})
         }
         this.setState({
         	companies:response.data
         })
      }).catch(error =>{
        if(error.response.status===422){
            this.setState({
              validationErrors:Object.values(error.response.data.errors),
              created:false,
            })
          }
      })
 }
 

 onChange = (e) => {
 	this.setState({
 		[e.target.name]:e.target.value,
 	})
 }



 add = (e) => {
	e.preventDefault();
	let token =  sessionStorage.getItem('token');
	axios.post('http://127.0.0.1:8000/api/employees',{
	 firstname:this.state.firstname,
     lastname:this.state.lastname,
     company_id:this.state.company_id,
     email:this.state.email,
     phone:this.state.phone,
     token:token
	}).then(response => {
        this.setState({
          firstname:"",
          lastname:"",
          company_id:"",
          email:"",
          phone:"",
          created:true,
          validationErrors:[],
        })
      }).catch(error =>{
        if(error.response.status===422){
            this.setState({
              validationErrors:Object.values(error.response.data.errors),
              created:false,
            })
          }
        }
      )
 }


	render(){
  

		return (

			<div className='container mt-5'>
					 { (this.state.validationErrors.length>0) && 
         		 <div className="alert alert-danger">
         		   <ul>
          		   { 
         		      this.state.validationErrors.map((error,key) => <li key={key}>{error}</li>)
         		    }         
         		   </ul>
         		 </div>
       					}		
			 <h2 className='text-center'>Create Employer</h2>
			 <div className='text-center'>Here you can Create Employer with <b>bottom</b> credentials</div>
			 {(this.state.created) ? <div className='alert alert-success text-center'>Employer was added sucessfully</div> : "" }
		    	{(!this.state.addCompError) ? 
		    		<form onSubmit={this.add} >
             			<div className="form-group">
    						<label htmlFor='id' className='fname'>Firstname:</label>
    						<input type="text" name='firstname' className="form-control" id="id"  onChange={this.onChange}  value={this.state.firstname} />
  			 			</div>
  			 			<div className="form-group">
    						<label className='fname' htmlFor='idem' >Lastname:</label>
    						<input type="text" name='lastname' className="form-control" id="idem" onChange={this.onChange} value={this.state.lastname} />
  			 			</div>
  			 			<div className='form-group'>
                            <label htmlFor="comp" className="font-weight-bold">Company Id:</label>
                            <select id='comp' name='company_id' value={this.state.company_id} className='form-control' onChange={this.onChange}>
                               <option hidden value=''>Choose Employer Company Id</option>
                               { 
                                   (this.state.companies.length>0) ?      
                                  this.state.companies[0].map((item) => <option value={item.id} key={item.id}> { item.id } </option>  ) : ""
                                }
                            </select>

  			 			</div>
  			 			<div className="form-group">
    						<label className='fname' htmlFor='webs'  >Email:</label>
    						<input type="email" name='email' className="form-control" id="webs" value={this.state.email} onChange={this.onChange}  />
  			 			</div>
  			 			<div className="form-group">
    						<label className='fname' htmlFor='phonenumber' >Phone:</label>
    						<input type="number" name='phone' className="form-control" id="phonenumber" onChange={this.onChange} value={this.state.phone} />
  			 			</div>
  			 			<button type="submit" className="btn btn-primary mt-3">Add</button>
    					<Link to='/dashboard' className="btn btn-danger mt-3 ml-2"> Cancel</Link>
		   			</form> 

		   :
		    		 <div className="alert alert-danger text-center font-weight-bold mt-5">For first you must add Company</div> }
		    </div>
		);
	}


}




