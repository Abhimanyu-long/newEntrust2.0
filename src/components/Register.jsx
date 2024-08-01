import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://10.10.7.81:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);
     
        toast(json.detail);


      if (response.ok) {
        toast.success(json.message || "Registration successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
  
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const onHandleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>

<div className="d-flex flex-column flex-root" id="nit_app_root">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-650px positon-xl-relative">
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px">
            <div className="d-flex flex-row-fluid flex-center flex-column text-center p-0 p-lg-0">
              <a href="" className="py-7 pt-lg-7">
                <img
                  alt="Logo"
                  src="assets/media/logos/neuralit-logo.png"
                  className="h-85px"
                />
              </a>
              <h1 className="d-none d-lg-block fw-bold text-white fs-2qx pb-5 pb-md-50">
                Entrust 2.0
              </h1>
              <p
                className="d-none d-lg-block fs-3 text-white text-align-left"
                style={{ textAlign: "left" }}
              >
                <br />
                <br />
                <i className="nit-dt nit-check fs-2x text-success"></i>ISO 27001
                Certified, HIPAA & GDPR Compliant
                <br />
                <i className="nit-dt nit-check fs-2x text-success "></i>
                Multi-tier quality assurance
                <br />
                <i className="nit-dt nit-check fs-2x text-success"></i>Per case
                fees, No fixed costs
                <br />
                <i className="nit-dt nit-check fs-2x text-success"></i>Special
                Rates by matter types
                <br />
                <i className="nit-dt nit-check fs-2x text-success"></i>No
                additional fees for rush matters
              </p>
            </div>
            <div
              className="d-none d-lg-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-250px min-h-lg-350px mb-0"
              style={{
                backgroundImage:
                  "url(https://www.neuralit.com/sites/default/files/2024-05/Website%20hero%20banner_2.png)",
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <div className="w-lg-700px p-10 p-lg-5 mx-auto">
              <form
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit}
              >
                <div className="mb-10 text-center">
                  <h1 className="text-gray-900 mb-3">Create an Account</h1> &nbsp;&nbsp;
                  <div className="text-gray-500 fw-semibold fs-4">
                    Already have an account? &nbsp;&nbsp;
                    <Link to="/" className="link-primary fw-bold">
                      Sign in here
                    </Link>
                  </div>
                </div>


                {/* new section */}
                <div className="alert alert-dark">
                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <p
                      className="alert alert-dark"
                      style={{ background: "#f4f4f4" }}
                    >
                      Account Information
                    </p>
                  </div>
                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Username *
                      </label>
                      <input
                        placeholder="enter user name"
                        className="form-control form-control-lg form-control-solid"
                        type="name" name='name'  required value={credentials.name} onChange={onHandleChange}
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        E-mail address *
                      </label>
                      <input
                        placeholder="Enter Email"
                        className="form-control form-control-lg form-control-solid"
                        type="email" name='email' value={credentials.email} onChange={onHandleChange} required
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Fullname *
                      </label>
                      <input
                        placeholder="enter full name"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Job Title
                      </label>
                      <input
                        placeholder="enter title"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="toc"
                        value="1"
                      />
                      <span className="form-check-label fw-semibold text-gray-700 fs-6">
                        I am Authorized Signatory
                      </span>
                    </label>
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Authorized Signatory Fullname
                      </label>
                      <input
                        placeholder="enter authorized signatory fullname"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Authorized Signatory Job Title
                      </label>
                      <input
                        placeholder="enter authorized signatory job title"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Authorized Signatory E-MAIL ADDRESS
                      </label>
                      <input
                        placeholder="enter authorized signatory email address"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>
                </div>

                {/* new section */}
                <div className="alert alert-dark fv-row mb-10 ">
                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <p
                      className="alert alert-dark"
                      style={{ background: "#f4f4f4" }}
                    >
                      Organization Details
                    </p>
                  </div>
                  <div className="row fv-row mb-10 fv-plugins-icon-container">
                    <div className="col-xl-10">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Organization/Firm
                      </label>
                      <input
                        placeholder="enter organization/firm"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Address Line1
                      </label>
                      <input
                        placeholder="enter address"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Address Line2
                      </label>
                      <input
                        placeholder="enter address"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Postal Code
                      </label>
                      <input
                        placeholder="enter postal code"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Country
                      </label>
                      <input
                        placeholder="enter country"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        State
                      </label>
                      <input
                        placeholder="enter state"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        City
                      </label>
                      <input
                        placeholder="enter city"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Contact No
                      </label>
                      <input
                        placeholder="enter contact no."
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Website
                      </label>
                      <input
                        placeholder="enter website"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>
                </div>

                {/* new section */}
                <div className="alert alert-dark">
                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <p
                      className="alert alert-dark fs-8"
                      style={{ background: "#f4f4f4" }}
                    >
                      Activation Code / Promo Code
                    </p>
                  </div>

                  <div className="row fv-row mb-7 fv-plugins-icon-container">
                    <div className="col-xl-6">
                      <label className="form-label fw-bold text-gray-900 fs-6">
                        Activation Code / Promo Code
                      </label>
                      <input
                        placeholder="enter code"
                        className="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first-name"
                        autoComplete="off"
                      />
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                  </div>
                </div>

                {/* new section */}
                <div className="alert alert-dark">
                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <p
                      className="alert alert-dark fs-8"
                      style={{ background: "#f4f4f4" }}
                    >
                      Privacy{" "}
                    </p>
                  </div>

                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <label className="form-check form-check-custom form-check-solid form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="toc"
                        value="1"
                      />
                      <span className="form-check-label fw-semibold text-gray-700 fs-6">
                        I agree to receive communications from Neural IT* <br />
                        By agreeing, you consent to allow Neural IT to store and
                        process the personal information submitted above to
                        provide you the content requested.
                      </span>
                    </label>
                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>
                </div>

                {/* this is bottom */}
                <div
                  className="mb-10 fv-row fv-plugins-icon-container"
                  data-nit-password-meter="true"
                >
                  <div className="mb-1">
                    <label className="form-label fw-bold text-gray-900 fs-6">
                      Create Password *
                    </label>
                    <div className="position-relative mb-3">
                      <input
                        placeholder="create password"
                        className="form-control form-control-lg form-control-solid"
                        type="password" name='password' value={credentials.password} onChange={onHandleChange} required="required"
                        autoComplete="off"
                      />
                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-nit-password-meter-control="visibility"
                      >
                        <i className="nit_dt nit-eye-slash fs-2"></i>
                        <i className="nit_dt nit-eye fs-2 d-none"></i>
                      </span>
                    </div>
                    <div
                      className="d-flex align-items-center mb-3"
                      data-nit-password-meter-control="highlight"
                    >
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                    </div>
                  </div>
                  <div className="text-muted">
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </div>
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div>

                {/* <div className="fv-row mb-5 fv-plugins-icon-container">
                  <label className="form-label fw-bold text-gray-900 fs-6">
                    Confirm Password
                  </label>
                  <input
                    placeholder="confirm password"
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="confirm-password"
                    autoComplete="off"
                  />
                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                </div> */}

                <div className="text-center">
                  <button
                    type="submit"
                    id="nit_sign_up_submit"
                    className="btn btn-lg btn-primary"
                  >
                    <span className="indicator-label">Create new account</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            <div className="d-flex flex-center fw-semibold fs-6">
              <a
                href="https://www.neuralit.com/about-us"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <a
                href="https://www.neuralit.com/terms-of-use"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </a>
              <a
                href="https://www.neuralit.com/privacy-statement"
                className="text-muted text-hover-primary px-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Statement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Toaster />
    </>
    
  );
};

export default Register;
