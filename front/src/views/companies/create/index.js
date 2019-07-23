import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import axios from 'axios';


export default class CompaniesCreate extends Component{

constructor(props){
    super(props);
    this.fileInput = React.createRef();
}


state = {
	name:"",
	email:"",
	website:"",
  created:false,
  selectedFile:null,
  validationErrors:[],
}




fileSelectedHandler = event => {
    this.setState({
      selectedFile:event.target.files[0]
    })
}




add = (e) => {
	e.preventDefault();
   


  const formData = new FormData();
  formData.append('name',this.state.name);
  formData.append('email',this.state.email);
  formData.append('website',this.state.website);
  if(this.state.selectedFile){
       formData.append('file',this.state.selectedFile);
  }



  axios({
    method:'post',
    url:'http://127.0.0.1:8000/api/companies',
    headers: {'Content-Type': 'multipart/form-data' },
    data: formData,
  }).then(response=>{

 
  if(response.status===204){
     this.setState({
           name:"",
           email:"",
           website:"",
           created:true,
           selectedFile:null,
           validationErrors:[],
         })
  }     
  }).catch(error=>{
    if(error.response.status===422){
             this.setState({
               validationErrors:Object.values(error.response.data.errors),
               created:false,
             })
           }
  })

   this.fileInput.current.value=""
}



onChange = (e) => {
 	this.setState({
 		[e.target.name]:e.target.value,
 	})
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

			 <h2 className="text-center">Add Company</h2>
        {(this.state.created) ? <div className='alert alert-success text-center'>Company was added sucessfully</div> : "" }
		   <form onSubmit={this.add}>
        <div className="form-group">
    			<label htmlFor='id' className='fname'>Name:</label>
    			<input type="text" name='name' className="form-control" id="id" onChange={this.onChange} value={this.state.name} />
  			 </div>
  			 <div className="form-group">
    			<label className='fname' htmlFor='idem' >Email:</label>
    			<input type="email" name='email' className="form-control" id="idem" onChange={this.onChange} value={this.state.email} />
  			 </div>
         <div className='form-group'>
          <label className='font-weight-bold' htmlFor='flogo'>Upload Logo</label>
          <br/>
          <input type='file'  id='flogo' onChange={this.fileSelectedHandler}  ref={this.fileInput}/>
         </div>
  			 <div className="form-group">
    			<label className='fname' htmlFor='webs' >Website:</label>
    			<input type="text" name='website' className="form-control" id="webs" onChange={this.onChange} value={this.state.website} />
    			<button type="submit" className="btn btn-primary mt-3">Add</button>
    			<Link to='/dashboard' className="btn btn-danger mt-3 ml-2"> Cancel</Link>
  			</div>
		   </form>
		 </div>
			);
	}
}




