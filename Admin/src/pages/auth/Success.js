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
import "react-toastify/dist/ReactToastify.css";


const Success = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [Auth, setAuth] = useState("");
  let checkout_value = sessionStorage.getItem("checkout");
  const [Login, AddLogin] = useState({
    password: "",
    email_address: "",
  });
  const history = useHistory();
  useEffect(() => { }, []);
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
                <BlockTitle tag="h4">Your Password has been updated successfully!</BlockTitle>

                <BlockDes>
                  <strong><p>You can now sign in with your new password</p></strong>
                </BlockDes>
              </BlockContent>
            </BlockHead>

            <Form className="is-alter">


              <FormGroup>
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <Button size="lg" className="btn-block" type="submit" color="primary">
                    <Icon name="arrow-left" /> Back to Login
                  {/* {loading ? <Spinner size="sm" color="light" /> : "Sign in"} */}
                </Button></Link>

              </FormGroup>
            </Form>

          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>

    </React.Fragment>
  );
};
export default Success;
