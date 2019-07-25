import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { connect } from 'react-redux';
import { getCompanies, deleteCompany } from 'store/actions/companies';




class CompaniesList extends Component {


  state = {
    postDeleted: false,
  }


  componentDidMount() {

    let token = sessionStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/companies?token=${token}`).then(response => {
      this.props.getCompanies(response.data);
    }).catch(error => {
      alert(error);
    })
  }


  deletePost = (id) => {
    let token = sessionStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    axios.delete(`http://127.0.0.1:8000/api/companies/${id}`, { headers }).then(response => {

      if (response.status === 204) {
        const companies = this.props.companies.filter((item) => item.id !== id);
        this.props.deleteCompany(companies);
        this.setState({
          postDeleted: true,
        })



      }

    }).catch(error => {
      alert(error);
    })

  }


  render() {
    console.log(this.props.companies)
    return (
      <div>
        <div className="font-weight-bold text-center mt-5 mb-3">Companies List</div>
        {(this.state.postDeleted) ? <div className='alert alert-success text-center'>Post was deleted successfully</div> : ""}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Logo</th>
              <th scope="col">Website</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {this.props.companies.map(item =>
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td><img className='logo' src={item.logo} alt="description" /></td>
                <td>{item.website}</td>
                <td>
                  <Link className="edit" to={`/companies/${item.id}/edit`}> <i className="fas fa-edit"></i></Link>
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



const mapStateToProps = ({ companies }) => ({ companies })

const mapDispatchToProps = {
  getCompanies,
  deleteCompany
}


export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);


