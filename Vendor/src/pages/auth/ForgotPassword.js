import React,{useState ,useEffect } from "react";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import Logo1 from "../../images/Logo1.png";
import LogoDark from "../../images/logo-dark.png";
import { FormGroup } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link, useHistory ,useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API_URL, token, API_Vendor } from "../../../src/Api";
import { ToastContainer, toast } from "react-toastify";
const UsersLogin = `${API_URL}/admin/ResetPassword/resetpasswordemail`;
const ForgotPassword = () => {
  const [Auth, setAuth] = useState("");
  const [cookies, setCookie] = useCookies();
  let checkout_value = sessionStorage.getItem("checkout");
  const [Pass, setPass] = useState({
    email_address: "",
  });
  const history = useHistory();

  useEffect(() => {}, []);
  const handleChange = ({ target: { name, value } }) => {
    setPass({ ...Pass, [name]: value });
  };
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const Submit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("vendor_staff", true);
    formData.append("email", Pass.email_address);
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
          if (res.data.statusCode == 200) {      
            toast.success("Mail Sent Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
             setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-login`), 1000);
            
          } else {           
            toast.error("Email-Id Is Wrong", {
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
          toast.error("Please enter valid email address", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.log("erororor", error);
    }
  };
  const { errors, register } = useForm();
  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
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
                <BlockTitle tag="h5">Forget Password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={Submit}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                 type="text"
                 name="email_address"
                 onChange={handleChange}
                 value={Pass.email_address}
                 autoComplete="off"
                 required
                 placeholder="Enter your email address"
                 className="form-control-lg form-control"
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" size="lg" className="btn-block" type="submit">
                  Send Reset Link
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ForgotPassword;
