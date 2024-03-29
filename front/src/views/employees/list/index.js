import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { connect } from 'react-redux';
import { getEmployees, deleteEmployee } from 'store/actions/employees';




class EmployeesList extends Component {


  state = {
    postDeleted: false,
  }



  componentDidMount() {
    let token = sessionStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/employees?token=${token}`).then(response => {
      this.props.getEmployees(response.data);

    }).catch(error => {
      alert(error);
    })
  }



  deletePost = (id) => {

    axios.delete(`http://127.0.0.1:8000/api/employees/${id}`).then(response => {

      if (response.status === 204) {

        const employees = this.props.employees.filter((item) => item.id !== id);
        this.props.deleteEmployee(employees);
        this.setState({
          postDeleted: true
        })

      }

    }).catch(error => {
      alert(error);
    })

  }




  render() {
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
            {this.props.employees.map(item =>
              <tr key={item.id}>
                <th scope="row">{item.firstname}</th>
                <td>{item.lastname}</td>
                <td>{item.company_id}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link className="edit" to={`/employees/${item.id}/edit`}><i className="fas fa-edit"></i></Link>
                  <button className="delete" onClick={() => this.deletePost(item.id)}><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}




const mapStateToProps = ({ employees }) => ({ employees })

const mapDispatchToProps = {
  getEmployees,
  deleteEmployee
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);



