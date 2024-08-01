import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import CarouselSection from "../components/CarouselSection";
import LoginForm from "../components/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Footer from "../components/Footer";
import Accreditation from "../components/Accreditation";

const API_URL = "http://10.10.7.81:8000/api";

const Entrust = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setTimeout(() => navigate("/home"), 500);
      } else {
        toast.error(json.message || "Enter valid credentials");
      }
    } catch (error) {
      toast.error(`Connection error: ${error.message}`);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
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

  return (
    <>
      <div className="d-flex flex-column flex-root loginPage" id="nit_app_root">
        <Header />
        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
          <div className="d-flex flex-column flex-lg-row-auto bg-primary w-xl-1000px position-xl-relative Carousel">
            <div className="CarouselHeader">
              <h1>Entrust 2.0</h1>
            </div>
            <CarouselSection />
          </div>

          <div className="d-flex flex-column flex-lg-row-fluid py-10 entrustlogin">
            <div className="d-flex flex-center flex-column flex-column-fluid">
              <div className="w-lg-500px p-10 p-lg-15 mx-auto">
                {forgot ? (
                  <LoginForm 
                    credentials={credentials} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    toggleForgotPassword={toggleForgotPassword} 
                  />
                ) : (
                  <ForgotPasswordForm 
                    forgotemail={forgotemail} 
                    handleChange={handleChange} 
                    handleForgot={handleForgot} 
                    toggleForgotPassword={toggleForgotPassword} 
                  />
                )}
              </div>
            </div>

            <Accreditation />
            <Footer />
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Entrust;
