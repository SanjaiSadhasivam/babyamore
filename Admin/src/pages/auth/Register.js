import React, { useState,useEffect } from "react";
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
import { useCookies } from "react-cookie";
import Logo from "../../images/logo.png";
import Logo1 from "../../images/Logo1.png";

import LogoDark from "../../images/logo-dark.png";
import { Spinner, FormGroup } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL,token,API_RESET_PASSWORD } from "../../../src/Api";
import { ToastContainer, toast } from "react-toastify";
const config = {
  headers: {
    "content-type": "multipart/form-data",
    // Authorization: `Bearer ${Auths} `
    Authorization: `Bearer ${token}`,
  },
};

const API_STAFF = `${API_URL}/admin/users`;
const Register = ({ history }) => {
  let {id} = useParams();
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [customerDetail, setCustomerDetail] = useState({
    email_address: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setCustomerDetail({ ...customerDetail, [name]: value });
  };
  const [ID, setID] = useState();

  useEffect(() => {
    getCustomerData(id);
    setID(id);
  }, []);
  

  const handleFormSubmit = async (ID) => {
    console.log(ID, "1111");
    let formData = new FormData();
    formData.append("admin_staff", true);
    formData.append("password", customerDetail.password);
    formData.append("confirm_password", customerDetail.confirm_password);
    
    await axios.post(`${API_RESET_PASSWORD}/${id}`, formData, config).then((res) => {
      if (res.data.statusCode == 200) {
           
        toast.success("Password updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 1000);
      } else {
        
        toast.error("Invalid Password", {
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
      toast.error("Passwords must be same", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const getCustomerData = async () => {
    let res = await axios.get(`${API_STAFF}/${id}`, config);
    console.log("eeeeeeeeeeeee", res.data.list[0].emailaddress);
    if (res) {
      setCustomerDetail({
        email_address: res.data.list[0].email_address,
        // password : res.data.list[0].password,
      });
    }
  };


  return (
    <React.Fragment>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo  text-center" >
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img   style={{height:'300px'}}className="logo-dark logo-img logo-img-lg" src={Logo1} alt="logo" />
              {/* <img   style={{height:'300px'}}className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Reset Password</BlockTitle>
                <BlockDes>
                  {/* <p>Create New Dashlite Account</p> */}
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              {/* <FormGroup>
                <label className="form-label" htmlFor="name">
                  Email-ID
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    readOnly
                    name="email_address"
                    value={customerDetail.email_address}
                    // placeholder="Enter your name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup> */}
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                   Password*
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    required
                    value={customerDetail.password}
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your password"
                  />
                 {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                  Confirm Password*
                  </label>
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
                    type={passState ? "text" : "password"}
                    onChange={handleChange}
                    name="confirm_password"
                    value={customerDetail.confirm_password}
                    ref={register({ required: "This field is required" })}
                    required
                    placeholder="Enter your confirm_password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {/* {loading ? <Spinner size="sm" color="light" /> : "Submit"} */}
                  Submit
                </Button>
              </FormGroup>
            </form>
            {/* <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div> */}
            {/* <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div> */}
            {/* <ul className="nav justify-center gx-8">
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
    </React.Fragment>
  );
};
export default Register;
