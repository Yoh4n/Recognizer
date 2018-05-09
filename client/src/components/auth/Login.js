import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(loginUser);
  }
  
  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-dark mb-4">Welcome!</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  <div className="card-body">
                    <form
                      className="form"
                      onSubmit={this.onSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success float-right"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
