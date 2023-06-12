import React, { useState, useEffect } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo1 from "../../images/Logo1.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { API_URL, token, API_Vendor } from "../../../src/Api";
import { ToastContainer, toast } from "react-toastify";

// const UsersLogin = `${API_URL}/admin/users/login`;
import { useCookies } from "react-cookie";
import axios from "axios";
// const Auths =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6InNhdGhpc3NoIiwic3RhdHVzIjp0cnVlLCJpYXQiOjE2NjIzODczODh9._bYmWAIION4-u4pBvELuIFXU_yFKpEZquA023g06nds";
const UsersLogin = `${API_URL}/admin/vendors/loginVendor`;
const Login = () => {   
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [Auth, setAuth] = useState("");
  const [cookies, setCookie] = useCookies();
  let checkout_value = sessionStorage.getItem("checkout");
  const [Login, AddLogin] = useState({
    password: "",
    email_address: "",
  });
  const history = useHistory();
  useEffect(() => {}, []);
  const handleChange = ({ target: { name, value } }) => {
    AddLogin({ ...Login, [name]: value });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
  });

  const [modalFail, setModalFail] = useState(false);
  const toggleModalFail = () => setModalFail(!modalFail);

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [route, setIsRoute] = useState();

  const Submit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    // formData.append("is_staff_login",true);
    formData.append("password", Login.password);
    formData.append("user_email_phone", Login.email_address);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token} `,
      },
    };
    try {
      axios
        .post(UsersLogin, formData, config)
        
        .then((res) => {
          console.log("res data",res.data)
          if (res.data.statusCode == 200) {
            toast.success("Login Success", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setAuth(res.data.token);
            
            localStorage.setItem("accessToken",res.data.token);
            localStorage.setItem("vendor_id", res.data.data.vendor_id);
            localStorage.setItem("email_address", res.data.data.email_address);
            
            setCookie("accesstoken", Auth);

            setTimeout(() => {
              setCookie("accesstoken", res.data.token);
              setCookie("vendor_id", res.data.data.vendor_id);
              setCookie("email_address", res.data.data.email_address);
              setCookie("phone_number", res.data.data.phone_number);
              AddLogin({
                password: "",
                email_address: "",
              });

              setIsOpen(true);
              setIsRoute(res);

              window.history.pushState(
                `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
                "auth-login",
                `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
              );
              window.location.reload();
            }, 1000);
          } else {
            console.log("login");
            toast.error("Email and Password Is Wrong", {
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
        })
        .catch(function (error) {
          toast.error("Invalid Credentials", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error.response.data); // this is the part you need that catches 400 request
        });
    } catch (error) {
      console.log("erororor", error);
    }
  };
  const { errors, register } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo  text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img style={{ height: "300px" }} className="logo-dark logo-img logo-img-lg" src={Logo1} alt="logo" />
              {/* <img style={{height:'300px'}} className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              {/* <h3 style={{textAlign:"center",color:"red"}}>VENDOR</h3> */}
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access Babyamore using your email and passcode.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={Submit}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="email_address"
                    onChange={handleChange}
                    value={Login.email_address}
                    autoComplete="off"
                    ref={register({ required: "This field is required" })}
                    required
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forget Password?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={Login.password}
                    autoComplete="off"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    required
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </FormGroup>
            </Form>
            {/* <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
            </div> */}
            {/* <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-4">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul> */}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
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
      {/* Same as */}
      <ToastContainer />
    </React.Fragment>
  );
};
export default Login;
