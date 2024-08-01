import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ credentials, handleChange, handleSubmit, toggleForgotPassword }) => (
  <form className="form w-100" onSubmit={handleSubmit}>
    <div className="text-center mb-10">
      <h1 className="text-gray-900 mb-3">Sign In to Entrust</h1>
      <div className="text-gray-500 fw-semibold fs-4">
        New Here? <Link to="/register" className="link-primary fw-bold">Create an Account</Link>
      </div>
    </div>

    <div className="fv-row mb-10">
      <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
      <input
        className="form-control form-control-lg form-control-solid"
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="fv-row mb-10">
      <div className="d-flex flex-stack mb-2">
        <label className="form-label fw-bold text-gray-900 fs-6 mb-0">Password</label>
        <Link onClick={toggleForgotPassword} className="link-primary fs-6 fw-bold">Forgot Password?</Link>
      </div>
      <input
        className="form-control form-control-lg form-control-solid"
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        autoComplete="off"
        required
      />
    </div>

    <div className="text-center">
      <button className="btn btn-lg btn-primary w-100 mb-5">Continue</button>
    </div>
  </form>
);

export default LoginForm;
