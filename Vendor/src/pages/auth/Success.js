import React from "react";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";

const Success = () => {
  
  return (
    <React.Fragment>
      <Head title="Success" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body">
          <div className="brand-logo pb-5">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img   style={{height:'300px'}}className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo" />

            </Link>
          </div>
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Thank you for submitting form</BlockTitle>
              <BlockDes className="text-success">
                <strong><p>You can now sign in with your new password</p></strong>
                <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong style={{marginRight:"30%"}}>Return to login</strong>
              </Link>
              </div>
              </BlockDes>
            </BlockContent>
          </BlockHead>
         
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Success;
