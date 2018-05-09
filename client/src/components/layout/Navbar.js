import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-2 mb-4 px-md-4 bg-dark border-bottom box-shadow text-white">
          <Link className="navbar-brand my-0 mr-md-auto" to="/">Recognizer</Link>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-white" to="/">
            Dashboard
          </Link>
        </nav>
        <Link className="btn btn-outline-success m-2" to="/Login">
          Login
        </Link>
        <Link className="btn btn-outline-primary m-2" to="/Register">
          Sign up
        </Link>
      </div>
    );
  }
}

export default Navbar;
