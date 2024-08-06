import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import neural from "../assets/neural.png";
import centure from "../assets/20centure.png";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "./bannerdata";
import accreditation from "../assets/Accreditation.png";

const API_URL = "http://10.10.0.29:8000/";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [forgot, setForgot] = useState(true);
  const [forgotemail, setForgotemail] = useState({ email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (forgot) {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setForgotemail((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCredentials = ({ email, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (forgot && (!password || password.includes(" "))) {
      toast.error("Password cannot be empty or contain spaces");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCredentials(credentials)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);

      if (response.ok) {
        toast.success(json.message || "Login successful!");
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        toast.error(json.message || "Enter valid credentials");
      }
    } catch (error) {
      toast.error(`Connection error: ${error.message}`);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!validateEmail(forgotemail.email)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotemail),
      });

      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);

      if (response.ok) {
        toast.success(json.message || "Reset instructions sent to email");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(json.message || "Enter a valid email");
      }
    } catch (error) {
      toast.error(`Connection error: ${error.message}`);
    }
  };

  const toggleForgotPassword = () => setForgot((prev) => !prev);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <>
      <div className="d-flex flex-column flex-root loginPage" id="nit_app_root">
        <header>
          <div className="d-flex flex-row px-14 mt-2 justify-content-between align-items-center">
            <img src={neural} alt="Neural IT Logo" width={200} height={65} />
            <img src={centure} alt="20 Centure Logo" width={80} height={70} />
          </div>
        </header>

        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
          <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-900px position-xl-relative Carousel  Carousel-mobile">
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
                    <img src={item.url} alt="Banner" width={900} height={450} className="Banner"/>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row-fluid py-10 entrustlogin">
            {/* Content */}
            <div className="d-flex flex-center flex-column flex-column-fluid">
              <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                <form className="form w-100" onSubmit={forgot ? handleSubmit : handleForgot}>
                  {/* Heading */}
                  <div className="text-center mb-10">
                    <h1 className="text-gray-900 mb-3">{forgot ? "Sign In to Entrust" : "Forgot Password?"}</h1>
                    {forgot && (
                      <div className="text-gray-500 fw-semibold fs-4">
                        New Here? <Link to="/register" className="link-primary fw-bold">Create an Account</Link>
                      </div>
                    )}
                  </div>

                  {/* Input group: Email */}
                  <div className="fv-row mb-10">
                    <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={forgot ? credentials.email : forgotemail.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Input group: Password (only for login) */}
                  {forgot && (
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
                  )}

                  {/* Actions */}
                  <div className="text-center">
                    <button className="btn btn-lg btn-primary w-100 mb-5">
                      <span className="indicator-label">{forgot ? "Continue" : "Submit"}</span>
                    </button>
                    {!forgot && (
                      <button type="button" className="btn btn-lg btn-light-primary fw-bold" onClick={toggleForgotPassword}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="accreditation">
              <img src={accreditation} alt="Accreditation" width={500} height={100} className="accreditationimg" />
            </div>

            {/* Footer */}
            <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0  footer-mobile">
              <div className="d-flex flex-center fw-semibold fs-6">
                <a href="https://www.neuralit.com/about-us" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">About</a>
                <a href="https://www.neuralit.com/terms-of-use" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                <a href="https://www.neuralit.com/privacy-statement" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Login;
