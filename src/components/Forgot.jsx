import React from "react";

const Forgot = () => {
  return (
    <div className="d-flex flex-column flex-root" id="nit_app_root">
      <form
        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" 
      >
        {/* Heading */}
        <div className="text-center mb-10">
          {/* Title */}
          <h1 className="text-gray-900 mb-3">Forgot Password?</h1>
          {/* Link */}
          <div className="text-gray-500 fw-semibold fs-4">
            Enter your email to reset your password.
          </div>
        </div>
        {/* Input group */}
        <div className="fv-row mb-10 fv-plugins-icon-container">
          <label className="form-label fw-bold text-gray-900 fs-6">Email</label>
          <input
            className="form-control form-control-solid"
            type="email"
            name="email"
            autoComplete="off"
            required
          />
          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        {/* Actions */}
        <div className="d-flex flex-wrap justify-content-center pb-lg-0">
          <button
            type="submit"
            id="nit_password_reset_submit"
            className="btn btn-lg btn-primary fw-bold me-4"
          >
            <span className="indicator-label">Submit</span>
          </button>
          <a className="btn btn-lg btn-light-primary fw-bold">Cancel</a>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
