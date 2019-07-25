import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {



	state = {
		email: "",
		password: "",
		loginerror: false,
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}



	login = (e) => {
		e.preventDefault();

		axios.post('http://127.0.0.1:8000/api/auth/login', this.state).then(response => {
			sessionStorage.setItem('token', response.data.access_token);
			this.props.check();
			this.props.history.push('/dashboard');
		}).catch(error => {
			this.setState({
				loginerror: true,
			})
		})
	}


	componentWillMount() {
		if (sessionStorage.getItem('token')) {
			this.props.history.push('/dashboard');
		}
	}


	render() {
		return (
			<div>
				<h2 className="text-center mt-2">Please Login</h2>
				{(this.state.loginerror) ? <div className='alert alert-danger text-center'>Wrong Email or Password</div> : ""}
				<div className='container mt-2'>
					<form onSubmit={this.login}>
						<div className="form-group">
							<label>Email</label>
							<input type="email"
								required
								className="form-control"
								placeholder="Enter email"
								name="email"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label>Password:</label>
							<input type="password"
								className="form-control"
								placeholder="Enter password"
								name="password"
								onChange={this.onChange}
							/>
						</div>
						<button type="submit"
							className="btn btn-primary"
						>Submit
    				</button>
					</form>
				</div>
			</div>
		)
	}
}
