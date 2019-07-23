import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './index.css';




export default class CompaniesCreate extends Component{


state = {
  employees:[],
  postDeleted:false,
}



componentDidMount(){
   let token =  sessionStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/employees?token=${token}`).then(response => {   
         this.setState({
           employees:response.data
         })
      }).catch(error =>{
        alert(error);
      })
 }



  deletePost = (id) => {
      
      axios.delete(`http://127.0.0.1:8000/api/employees/${id}`).then(response=>{
       
       if(response.status===204){
        this.setState((oldState)=>{
         const employees = oldState.employees.filter((item)=> item.id!==id);
         return {...oldState,employees,postDeleted:true};
       })
       }
       
    }).catch(error =>{
      alert(error);
    })

  }






	render(){
		return (
      <div>
        <div className="font-weight-bold text-center mt-5 mb-3">Employees List</div>
      {(this.state.postDeleted) ? <div className='alert alert-success text-center'>Employer was deleted successfully</div> : ""}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Company Id</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
      <tbody>
         { this.state.employees.map(item =>
            <tr key={item.id}> 
              <th scope="row">{item.firstname}</th>
              <td>{item.lastname}</td>
              <td>{item.company_id}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
              <Link className="edit" to={`/employees/${item.id}/edit`}><i className="fas fa-edit"></i></Link>
              <button className="delete" onClick={()=>this.deletePost(item.id)}><i className="fas fa-trash"></i></button>
              </td>
            </tr>
          )}
     </tbody>
     </table> 
      </div>
      );
	}
}




