import  React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {


  render() {  

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                   <Link className="navbar-brand" to='/'>React/Laravel-test</Link>
 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
            </button>
    
                   <div className="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul className="navbar-nav mr-auto"></ul>
                           <ul className="navbar-nav ml-auto">
                                   <li className="nav-item">
                                     <Link className="nav-link" to='/login'>Login</Link>  
                                   </li>
                           </ul>
                    </div>
                </div>
            </nav>
        </div>
         );
  }
}
