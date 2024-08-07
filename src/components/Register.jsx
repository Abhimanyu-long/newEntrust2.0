import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "./bannerdata";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!credentials.name.trim() || credentials.name.trim().length < 2) {
      errors.name = "Name is required and must be at least 2 characters long";
      isValid = false;
      nameRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email) {
      errors.email = "Email is required";
      isValid = false;
      if (isValid) emailRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!emailRegex.test(credentials.email)) {
      errors.email = "Email is not valid";
      isValid = false;
      if (isValid) emailRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (!credentials.password) {
      errors.password = "Password is required";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (credentials.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (/\s/.test(credentials.password)) {
      errors.password = "Password must not contain spaces";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const response = await register(credentials);

      if (response.status === 200) {
        toast.success(response.data.message || "Registration successful!");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(response.data.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const onHandleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="d-flex flex-column flex-root" id="nit_app_root">
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
          <div className="d-flex flex-column flex-lg-row flex-column-fluid">
            <div className="left-fixed-section Carousel-mobile">
              <div className="d-flex flex-column flex-lg-row-auto position-xl-relative Carousel">
                <div className="CarouselHeader">
                  <h1>Entrust 2.0</h1>
                </div>
                <div className="Carouselmain">
                  <Carousel
                    responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                  >
                    {bannerData.map((item) => (
                      <div className="Carouseltextbox" key={item.id}>
                        <div className="Carouseltextmain">
                          <p>{item.text}</p>
                        </div>
                        <img
                          src={item.url}
                          alt="Banner"
                          width={900}
                          height={450}
                          className="Banner"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>

            <div className="right-content d-flex flex-column flex-lg-row-fluid py-10">
              <div className="d-flex flex-center flex-column flex-column-fluid">
                <div className="w-lg-600px p-2 p-lg-5 mx-auto">
                  <form
                    className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-10 text-center">
                      <h1 className="text-gray-900 mb-3">Create an Account</h1>{" "}
                      &nbsp;&nbsp;
                      <div className="text-gray-500 fw-semibold fs-4">
                        Already have an account? &nbsp;&nbsp;
                        <Link to="/" className="link-primary fw-bold">
                          Sign in here
                        </Link>
                      </div>
                    </div>

                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container ">
                        <p
                          className="alert alert-dark bg-primary"
                          style={{ background: "#30a6b6;" }}
                        >
                          Account Information
                        </p>
                      </div>
                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            User Name *
                          </label>
                          <input
                            placeholder="Enter User Name"
                            className="form-control form-control-lg form-control-solid"
                            type="name"
                            name="name"
                            required
                            value={credentials.name}
                            onChange={onHandleChange}
                            autoComplete="off"
                            ref={nameRef}
                          />
                          {errors.name && (
                            <p style={{ color: "red" }}>{errors.name}</p>
                          )}
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            E-mail Address *
                          </label>
                          <input
                            placeholder="Enter Email"
                            className="form-control form-control-lg form-control-solid"
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={onHandleChange}
                            required
                            autoComplete="off"
                            ref={emailRef}
                          />
                          {errors.email && (
                            <p style={{ color: "red" }}>{errors.email}</p>
                          )}
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Full Name *
                          </label>
                          <input
                            placeholder="Enter Full Name"
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
                            placeholder="Enter Title"
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
                            onFocus={(e) => {
                              e.target.style.border = "1px solid black";
                              e.target.style.padding = "1px";
                              e.target.style.boxShadow =
                                "0 0 5px rgba(0, 0, 0, 0.5)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "";
                              e.target.style.padding = "";
                              e.target.style.boxShadow = "";
                            }}
                            onChange={handleCheckboxChange}
                          />
                          <span className="form-check-label fw-semibold text-gray-700 fs-6">
                            I am Authorized Signatory
                          </span>
                        </label>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>

                      {isChecked && (
                        <>
                          <div className="row fv-row mb-7 fv-plugins-icon-container">
                            <div className="col-xl-6">
                              <label className="form-label fw-bold text-gray-900 fs-6">
                                Authorized Signatory Fullname
                              </label>
                              <input
                                placeholder="Enter Authorized Signatory Full Name"
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
                                placeholder="Enter Authorized Signatory Job Title"
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
                                placeholder="Enter Authorized Signatory Email Address"
                                className="form-control form-control-lg form-control-solid"
                                type="text"
                                name="email-address"
                                autoComplete="off"
                              />
                              <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="alert alert-dark fv-row mb-10 ">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark bg-primary"
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
                            placeholder="Enter Organization/Firm"
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
                            placeholder="Enter Address"
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
                            placeholder="Enter Address"
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
                            placeholder="Enter Postal Code"
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
                            placeholder="Enter Country"
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
                            placeholder="Enter State"
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
                            placeholder="Enter City"
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
                            placeholder="Enter Contact No."
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
                            placeholder="Enter Website"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark bg-primary"
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
                            placeholder="Enter Code"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark bg-primary"
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
                            onFocus={(e) => {
                              e.target.style.border = "1px solid black";
                              e.target.style.padding = "1px";
                              e.target.style.boxShadow =
                                "0 0 5px rgba(0, 0, 0, 0.5)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "";
                              e.target.style.padding = "";
                              e.target.style.boxShadow = "";
                            }}
                          />
                          <span className="form-check-label fw-semibold text-gray-700 fs-6">
                            I agree to receive communications from Neural IT*{" "}
                            <br />
                            By agreeing, you consent to allow Neural IT to store
                            and process the personal information submitted above
                            to provide you the content requested.
                          </span>
                        </label>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>
                    </div>

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
                            placeholder="Create Password"
                            className="form-control form-control-lg form-control-solid"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={onHandleChange}
                            required="required"
                            autoComplete="off"
                            ref={passwordRef}
                          />
                          {errors.password && (
                            <p style={{ color: "red" }}>{errors.password}</p>
                          )}
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
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        id="nit_sign_up_submit"
                        className="btn btn-lg btn-primary"
                      >
                        <span className="indicator-label">
                          Create new account
                        </span>
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
      </div>

      <Toaster />
    </>
  );
};

export default Register;
