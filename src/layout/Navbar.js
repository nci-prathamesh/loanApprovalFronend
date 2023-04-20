import React from 'react'
import {Link} from "react-router-dom";
import AddUser from '../users/AddUser';

export default function Navbar() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><h2>Prime Finance.</h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="btn btn-outline-light" to="/">Log Out</Link>
    
  </div>
</nav>


    </div>
  )
}
