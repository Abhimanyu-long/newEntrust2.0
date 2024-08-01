import React from "react";

const ForgotPasswordForm = ({ forgotemail, handleChange, handleForgot, toggleForgotPassword }) => (
  <form className="form w-100" onSubmit={handleForgot}>
    <div className="text-center mb-10">
      <h1 className="text-gray-900 mb-3">Forgot Password?</h1>
      <div className="text-gray-500 fw-semibold fs-4">Enter your email to reset your password.</div>
    </div>

    <div className="fv-row mb-10">
      <label className="form-label fw-bold text-gray-900 fs-6">Email</label>
      <input
        className="form-control form-control-solid"
        type="email"
        name="email"
        placeholder="Email"
        value={forgotemail.email}
        onChange={handleChange}
        autoComplete="off"
        required
      />
    </div>

    <div className="text-center">
      <button className="btn btn-lg btn-primary fw-bold">Submit</button>
      <button type="button" className="btn btn-lg btn-light-primary fw-bold" onClick={toggleForgotPassword}>
        Cancel
      </button>
    </div>
  </form>
);

export default ForgotPasswordForm;
