import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';


export default class CompaniesEdit extends Component {


  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }


  id = this.props.match.params.id;


  state = {
    validationErrors: [],
    selectedFile: null,
    company: {
      id: "",
      name: "",
      email: "",
      logo: "",
      website: '',
    },
  }



  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }



  componentDidMount() {


    axios.get(`http://127.0.0.1:8000/api/companies/${this.id}`).then(response => {
      const { id, name, email, logo, website } = response.data;

      this.setState({
        company: {
          id,
          name,
          email,
          logo,
          website,
        }
      })
    }).catch(error => {
      this.props.history.push('/dashboard');
    })
  }

  onChange = (e) => {

    const { name, value } = e.target;

    this.setState({
      company: {
        ...this.state.company,
        [name]: value
      },
    })
  }



  edit = (e) => {
    e.preventDefault();



    const formData = new FormData();

    formData.append('id', this.state.company.id);
    formData.append('name', this.state.company.name);
    if (!this.state.company.email) {
      formData.append('email', "");
    }

    if (!this.state.company.website) {
      formData.append('website', "");
    }

    if (this.state.selectedFile) {
      formData.append('file', this.state.selectedFile);
    }

    formData.append('_method', 'PUT');



    axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/api/companies/${this.id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    }).then(response => {
      if (response.status === 204) {
        this.props.history.push('/companies');
      }
    }).catch(error => {
      if (error.response.status === 422) {
        this.setState({
          validationErrors: Object.values(error.response.data.errors),
          created: false,
        })
      }
    })

    this.fileInput.current.value = ""
  }


  render() {

    const { name, email, website } = this.state.company;

    return (
      <div className='container  mt-3'>
        {(this.state.validationErrors.length > 0) &&
          <div className="alert alert-danger">
            <ul>
              {
                this.state.validationErrors.map((error, key) => <li key={key}>{error}</li>)
              }
            </ul>
          </div>
        }
        <h2 className='text-center'>Here you can edit Company with id {this.id}</h2>
        <form onSubmit={this.edit}>
          <div className="form-group">
            <label htmlFor='id' className='fname'>Name:</label>
            <input type="text" name='name' className="form-control" id="id" onChange={this.onChange} value={name} />
          </div>
          <div className="form-group">
            <label className='fname' htmlFor='idem' >Email:</label>
            <input type="email" name='email' className="form-control" id="idem" onChange={this.onChange} value={email ? email : ""} />
          </div>
          <div className='form-group'>
            <label className='font-weight-bold' htmlFor='flogo'>Edit Logo</label>
            <br />
            <input type='file' id='flogo' onChange={this.fileSelectedHandler} ref={this.fileInput} />
          </div>
          <div className="form-group">
            <label className='fname' htmlFor='webs' >Website:</label>
            <input type="text" name='website' className="form-control" id="webs" onChange={this.onChange} value={website ? website : ""} />
            <button type="submit" className="btn btn-primary mt-3">Edit</button>
            <Link to='/dashboard' className="btn btn-danger mt-3 ml-2"> Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}