import React, { useState, useEffect } from "react";
import "../assets/styles/form.css";
import "../assets/styles/responsive.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  FaEye,
  FaEnvelope,
  FaMobileAlt,
  FaGoogle,
  FaFacebookF,
  FaUserCircle,
  FaInfoCircle,
} from "react-icons/fa";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import TermsConditions from "../components/TermsConditions/Terms";
import { API_Register, token } from "../config/config";

// const config = {
//   headers: {
//     "Authorization": `Bearer ${token}`
//   },
// };

const RegisterPage = () => {
  const [passwordType, setpasswordType] = useState(false);
  const [cnfmpasswordType, setCnfmpasswordType] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
    showPassword: false,
  });
  const [valueForm, setValueForm] = useState({
    customer_id: "",
    full_name: "",
    status: 1,
    email_address: "",
    phone_number: "",
    password: "",
  });
  const navigate = useNavigate();
  const [openAlert, setopenAlert] = React.useState(false);
  const [userAgree, setUserAgree] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Id, setId] = React.useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValueForm({ ...valueForm, [name]: value });
  };

const handlePwdIconChange = () => {
  setCnfmpasswordType(!cnfmpasswordType);
  setpasswordType(!passwordType);
}
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword: !values1.showPassword });
  };

  const [value, setValue] = React.useState();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState();

  const handleClickListItem1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (newValue) => {
    setOpen1(false);
  };
  const Submit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("full_name", valueForm.full_name);
    formData.append("email_address", valueForm.email_address);
    formData.append("phone_number", valueForm.phone_number);
    formData.append("password", valueForm.password);
    formData.append("status", valueForm.status);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${Auths} `
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      axios
        .post(API_Register, formData, config)
        .then((res) => {
          setValueForm({
            // name: "",
            full_name: "",
            email_address: "",
            phone_number: "",
            password: "",
          });

          toast.success("Register Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            closeButton: false,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/Login");
          }, 3000);
        })
        .catch((error) => {
          if (!toast.isActive('login')) {
            toast.error("Email Already exist!", {
                toastId: 'login',
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                // pauseOnHover: true,
                closeButton: false,
                draggable: true,
                className: 'notificationToolTip',
            });}
          
        });
    } catch (error) {}
  };
  const CnfmPwEyeIcon = {
    position: "absolute",
    right: "11px",
    bottom: "18px",
}

const eyeicon = {
    width: "17px",
    height: "17px",
}

const cnfmpwInput = {
    height: "43px",
    paddingLeft: "15px",
    width: "100%",
    marginBottom: "0px",
}
  return (
    <div>
      <section className="checkout_area" style={{ backgroundColor: "#f7f7f7" }}>
        <h3
          style={{
            fontSize: "2.8em",
            fontWeight: 600,
            textAlign: "center",
            paddingTop: 15,
          }}
        >
          {" "}
          <span style={{ color: "#fc8181", fontSize: "25px" }}>Sign up</span>
        </h3>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-sm-4 col-xs-6 mis  mx-auto">
              <div className="card p-5 mb-5">
                <div className="checkout_left" style={{ paddingTop: 4 }}>
                  {/* <h2> LOGIN </h2> */}

                  <form onSubmit={Submit}>
                    <div className="checkout_form">
                      <div className="company_name focus-visble input">
                        <p>Name <span style={{fontSize:"25px",color:"red"}}>*</span></p>
                        <i className="fa-solid icon">
                          {" "}
                          <FaUserCircle />{" "}
                        </i>
                        <input
                          type="text"
                          className="sty2 in-numsty"
                          placeholder="Enter Your Name "
                          name="full_name"
                          onChange={handleChange}
                          value={valueForm.full_name}
                          autoComplete="off"
                          pattern="[A-Za-z\s]{0,50}"
                          title="Pleace Enter Alphabet Characters Only"
                          required
                        />
                      </div>
                      <div className="company_name focus-visble input">
                        <p>Email <span style={{fontSize:"25px",color:"red"}}>*</span></p>
                        <i className="fa-solid icon">
                          {" "}
                          <FaEnvelope />{" "}
                        </i>
                        <input
                          type="email"
                          className="sty2 in-numsty text-lowercase"
                          name="email_address"
                          placeholder="Enter Your Email address"
                          onChange={handleChange}
                          value={valueForm.email_address}
                          autoComplete="off"
                          pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
                          title="Valid e-mail address including top-level domain"
                          required
                        />
                      </div>
                      <div className="c_address input ">
                        <p> Phone Number <span style={{fontSize:"25px",color:"red"}}>*</span></p>
                        <i className="fa-solid icon">
                          {" "}
                          <FaMobileAlt />{" "}
                        </i>
                        <input
                          type="text"
                          className="sty2 in-numsty"
                          name="phone_number"
                          placeholder="Enter Your Phone Number"
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          value={valueForm.phone_number}
                          autoComplete="off"   minLength={10}
                          maxLength={12}
                          required
                       
                       
                        />
                      </div>
                      <div className="company_name focus-visble input position-relative">
                        <p>Password <span style={{fontSize:"25px",color:"red"}}>*</span></p>
                        <i className="fa-solid icon">
                          {" "}
                          <RiLockPasswordFill />{" "}
                        </i>
                        <input
                           type={cnfmpasswordType ? "text" : "password"}
                          className="sty2"
                          placeholder="Enter Your Password"
                          name="password"
                          minLength={8}
                          maxLength={15}
                          onChange={handleChange}
                          value={valueForm.password}
                          style={cnfmpwInput}
                          autoComplete="off"
                          required
                        />
                          <span style={CnfmPwEyeIcon} onClick={handlePwdIconChange}>
                                            <a>
                                                {passwordType ? <AiOutlineEye style={eyeicon} /> : <AiOutlineEyeInvisible style={eyeicon} />}
                                            </a>
                                        </span>
                      </div>

                      <div className="checkbox checkbox1 mt-4">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox-1 mt-4"
                            id="rememberme"
                            onChange={(e) => setUserAgree(e.target.checked)}
                            value={valueForm.status}
                          />
                          <span class="geekmark my-1" for="rememberme"></span>
                        </label>
                        <p>
                          {" "}
                          By creating an account or logging in,you agree to
                          BabyAmore's conditions of Use And Privacy Policy
                          <i
                            className="fa-solid icon2"
                            aria-haspopup="true"
                            aria-controls="terms"
                            aria-label="term_and_condition"
                            onClick={handleClickListItem1}
                          >
                            {" "}
                            <FaInfoCircle />
                          </i>
                        </p>
                      </div>

                      <button
                        type="Submit"
                        className="btn btn-default btn-lg btn-block request-otp sty stee log-button signup-btn"
                        id="request-otp"
                        aria-haspopup="true"
                        aria-controls="otp"
                        disabled={!userAgree}
                        aria-label="otp verification"
                        //   onClick={handleRegister}
                        style={{ width: "100%" }}
                      >
                        Sign up
                      </button>
                      <div className="forgot-password pt-5">
                        <i className="fa-solid icon icon_1">
                          {" "}
                          <FaGoogle />{" "}
                        </i>
                        <i className="fa-solid icon icon_1">
                          {" "}
                          <FaFacebookF />{" "}
                        </i>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="forgot-password  mb-5">
                <h4
                  style={{ textAlign: "center", fontSize: 20, color: "#000" }}
                >
                  Already have an account?{" "}
                  <a
                    href="/login"
                    style={{
                      color: "#d26e4b",
                      fontWeight: 600,
                      fontSize: 20,
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    Sign in !
                  </a>{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </div>
  );
};

export default RegisterPage;
