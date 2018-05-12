import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="card bg-light col-sm-6 mx-auto mt-4">
        <article className="card-body">
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <hr />
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user" />{" "}
                </span>
              </div>
              <input
                name="name"
                className={classnames("form-control", {
                  "is-invalid": errors.name
                })}
                placeholder="Full name"
                type="text"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope" />{" "}
                </span>
              </div>
              <input
                name="email"
                className={classnames("form-control", {
                  "is-invalid": errors.email
                })}
                placeholder="Email address"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock" />{" "}
                </span>
              </div>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.password
                })}
                placeholder="Create password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock" />{" "}
                </span>
              </div>
              <input
                className={classnames("form-control", {
                  "is-invalid": errors.password2
                })}
                placeholder="Confirm password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                {" "}
                Create Account{" "}
              </button>
            </div>
            <p className="text-center">
              Have an account? <Link to="/Login">Log In</Link>{" "}
            </p>
          </form>
        </article>
      </div>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
