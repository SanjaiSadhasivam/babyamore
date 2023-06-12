import React, { useState, useEffect, useContext } from "react";
import "../assets/styles/form.css";
import "../assets/styles/responsive.css";
import { ToastContainer, toast } from "react-toastify";
import { cartContext } from "../layout/layout";
import {
  FaEnvelope,
  FaLock,
  FaCheckSquare,
  FaGoogle,
  FaFacebookF,
  FaMobileAlt,
} from "react-icons/fa";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { API_Login, token, API_Login_Otp } from "../config/config";
import { useCookies } from "react-cookie";
const config = {
  headers: {
    "content-type": "multipart/form-data",
    // Authorization: `Bearer ${Auths} `
    Authorization: `Bearer ${token}`,
  },
};
const Login = () => {
  const { carts, removeCart, total_amount, total_items, GetCartdatas } =
    useContext(cartContext);
  let checkout_value = sessionStorage.getItem("checkout");
  const [values, setValues] = React.useState({
    checked: false,
  });
  const handleChange = () => {
    setIsTrue(false);
  };

  const handleSetChange = () => {
    setIsTrue(true);
  };

  const [open, setOpen] = React.useState(false);
  const [openmail, setOpenmail] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const [Error, setError] = React.useState("");
  const [Id, setId] = React.useState("");
  const [Login, setLogin] = useState({
    customer_id: "",
    email_address: "",
    otp:"",
    phone_number: "",
    password: "",
  });
  const [isTrue, setIsTrue] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const phone=location.state

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };


const [OTP,setOTP]=useState(true)
  useEffect(() => { }, []);

  const handleChangelogin = ({ target: { name, value } }) => {
    setLogin({ ...Login, [name]: value });
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [route, setIsRoute] = useState();

// const Getotp = async(e)=>{
//   e.preventDefault();
//     let formData = new FormData();
//     formData.append("phone_number", Login.email_address);
//   let result = await axios.post(API_Login_Otp, formData, config);
// }

  const Submit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("customer_id", Login.customer_id);
    formData.append("otplogin", true);
    formData.append("otp", Login.otp);
    formData.append("email_address", phone);
    formData.append("phone_number", Login.phone_number);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${Auths} `
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let result = await axios.post(API_Login, formData, config);
      if (result.data.statusCode == 200) {
        setCookie("accesstoken", result.data.token);
        setCookie("fullName", result.data.data.fullName);
        setCookie("phone_number", result.data.data.phone_number);
        setCookie("email_address", result.data.data.email_address);
        setCookie("customer_id", result.data.data.Userid);
        setCookie("pincodeid", 60006);
        removeCookie("pincode");
        setLogin({
          ...Login,
          customer_id: "",
          phone_number: "",
          password: "",
          email_address: "",
        });

        GetCartdatas();
        toast.success("Login Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/";
          // navigate("/");
          localStorage.removeItem("cartproduct");
          localStorage.removeItem("viewcart");
          localStorage.removeItem("localcart");
        }, 3000);
      }
      else if (result.data.statusCode == 400) {

        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else{
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    }
  };

  return (
    <div>
      <section
        className="checkout_area "
      // style={{ backgroundColor: "#f7f7f7" }}
      >
        <h3
          className="login_title"
        // style={{
        //   fontSize: "2.8em",
        //   fontWeight: 600,
        //   textAlign: "center",
        //   paddingTop: 15,
        // }}
        >
          {" "}
          <span style={{ color: "#fc8181" }}>Welcome Back!</span> Sign in to
          continue
        </h3>
        <div className="container pt-md-5 pt-1 ">
          <div className="row">
            <div className="col-md-offset-3 col-md-6 col-sm-4 col-xs-6 mis mx-auto">
              <div className="login-card p-md-5 p-3 mb-5">
                <div className="checkout_left" style={{ paddingTop: 4 }}>
                  <h2> {Error} </h2>

                  {/* <div className=" check-login ">
                    <button
                      className={isTrue ? "email-btn" : "email-btn-change"}
                      onClick={handleChange}
                    >
                      Email
                    </button>
                    <button
                      className={isTrue ? "email-btn-change" : "email-btn"}
                      onClick={handleSetChange}
                    >
                      Phone
                    </button>
                  </div> */}
                  <form onSubmit={Submit}>
                    <div className="login-form">
                      <div className="company_name focus-visble input">
                        {/* <p> {isTrue ? "Mobile_number" : "Email_address"}</p> */}
                        {/* <i className="fa-solid icon">
                          {isTrue ? <FaMobileAlt /> : <FaEnvelope />}
                        </i> */}
                        {/* <div className="d-flex align-items-center">
                          <input
                            type="text"
                            className="sty2 mb-0"
                            name="email_address"
                            value={Login.email_address}
                            onChange={handleChangelogin}
                            placeholder={
                              isTrue
                                ? "Enter Your Mobile Number"
                                : "Enter Your Email"
                            }
                            autoComplete="off"
                            required
                          />
                          <button className="button-posi" type="button"  onClick={(e)=>Getotp(e)}>
                            GET OTP
                          </button>
                        </div> */}

                        <p className="mt-5">OTP</p>
                        <i className="fa-solid icon">
                          {" "}
                          <RiLockPasswordFill />{" "}
                        </i>
                        <input
                          type="text"
                          className="sty2"
                          name="otp"
                          value={Login.otp}
                          onChange={handleChangelogin}
                          placeholder="Enter Your OTP"
                          autoComplete="off"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-default btn-lg btn-block request-otp sty stee log-button"
                        id="request-otp"
                        aria-haspopup="true"
                        aria-controls="otp"
                        aria-label="otp verification"
                        style={{ width: "100%" }}
                      >
                        Sign in
                      </button>
                      {/* <div className="forgot-password pt-5">
                        <i className="fa-solid icon icon_1">
                          {" "}
                          <FaGoogle />{" "}
                        </i>
                        <i className="fa-solid icon icon_1">
                          {" "}
                          <FaFacebookF />{" "}
                        </i>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="forgot-password  mb-5">
                <h4
                  style={{ textAlign: "center", fontSize: 20, color: "#000" }}
                >
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    style={{
                      color: "#d26e4b",
                      fontWeight: 600,
                      fontSize: 20,
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    SIGN UP !
                  </a>{" "}
                </h4>
              </div> */}
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

export default Login;
