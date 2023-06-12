import React, { Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
  
} from "../../../components/Component";
import {Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Badge,Label,FormGroup,Form,Modal,ModalHeader ,ModalBody,ModalFooter } from "reactstrap"


import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OrderPoc = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [Addpoc , setAddpoc] = useState(false);
  const ADDPOC = () => {setAddpoc(!Addpoc)};
  const [emailid , setemailid] = useState(false);
  const EmailId = () => {setemailid(!emailid)};
  const [mobile , setmobile] = useState(false);
  const MobileNumber = () => {setmobile(!mobile)};
  const { errors, register, handleSubmit } = useForm();

 

  const onFormSubmit = (e) => {};
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  
  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChange1 = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeGST = (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const handleDropChangeFood= (acceptedFiles, set) => {
    set(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
 
  return (
      <div>
    <React.Fragment>
      <Head title="Overview"></Head>
          
        <Block className="container">
            <Row>
                <Col md={6}>
                <p>Order POC Details</p>
                </Col>
                <Col md={6} className="text-right">
                <Button color="primary" size="sm" onClick={ADDPOC}>
  <Icon name="plus" />
  <span>Add POC</span>
</Button>
                </Col>
            </Row>
            <hr></hr>
        <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
       <Row>
    <Col md={12}>
    <Card className="card-bordered">
  <CardBody className="card-inner">
    <CardTitle tag="p"><Badge color="primary" className="badge-dim">Primary POC - Team-1</Badge></CardTitle>
    
    <CardText>
     <div className="row">
         <div className="col-md-2">
             <p className="font-weight-bold">Designation </p>
         </div>
         <div className="col-md-1">
             <p>: </p>
         </div>
         <div className="col-md-2">
             <p>Proprietor </p>
         </div>
     </div>
     <div className="row">
         <div className="col-md-2">
             <p className="font-weight-bold">Email Address </p>
         </div>
         <div className="col-md-1">
             <p>: </p>
         </div>
         <div className="col-md-9">
             <p>imthad@gmail.com <Icon name="pen" onClick={EmailId} style={{cursor:'pointer'}}></Icon> </p>
         </div>
     </div>

     <div className="row">
         <div className="col-md-2">
             <p className="font-weight-bold">Mobile Number </p>
         </div>
         <div className="col-md-1">
             <p>: </p>
         </div>
         <div className="col-md-2">
             <p>9790583438<Icon name="pen" onClick={MobileNumber} style={{cursor:'pointer'}}></Icon> </p>
         </div>
     </div>

     <div className="row">
         <div className="col-md-6">
             <p className="font-weight-bold"> MWould you like to receive communication on order*
 </p>
         </div>
         
       
         <div className="col-md-6">
             <p>Yes  </p>
         </div>
     </div>
    </CardText>
    
  </CardBody>
</Card>
    </Col>
           
           
           </Row>
          
          
           

       </Form>
       
        </Block>
   
       
    </React.Fragment>
    {/* add poc */}
    <Modal isOpen={Addpoc} toggle={ADDPOC}>
      <ModalHeader
        toggle={ADDPOC}
        close={
          <button className="close" onClick={ADDPOC}>
            <Icon name="cross" />
          </button>
        }
      >
        Add Order POC
      </ModalHeader>
      <ModalBody>
       
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
              Label Name 
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-email">
              Name of the Person 
              </Label>
              <div className="form-control-wrap">
                <input
                
                  type="text"
                  id="fv-email"
                  name="email"
                  className="form-control"
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-subject">
              Designation  
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-subject"
                  name="subject"
                  className="form-control"
                />
                {errors.subject && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
          <FormGroup>
              <Label className="form-label" htmlFor="fv-email">
                Email Id
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="fv-email"
                  name="email"
                  className="form-control"
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
          <FormGroup>
              <Label className="form-label" htmlFor="fv-subject">
              Mobile    
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-subject"
                  name="subject"
                  className="form-control"
                />
                {errors.subject && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="12">
          <FormGroup>
              <Label>Would You Like To Receive Communication On Order *</Label>
                    <ul className="custom-control-group g-3 align-center flex-wrap">
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            defaultChecked
                            name="reg-public"
                            id="reg-enable"
                          />
                          <label className="custom-control-label" htmlFor="reg-enable">
                            Yes
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="reg-public1"
                            id="reg-disable"
                          />
                          <label className="custom-control-label" htmlFor="reg-disable">
                            No
                          </label>
                        </div>
                      </li>
                      
                    </ul>
                  </FormGroup>
          </Col>
          <Col md="12">
          <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    defaultChecked
                    id="customCheck2"
                  />
                  <label className="custom-control-label" htmlFor="customCheck2">
                  Mark As Default Primary POC
                  </label>
                </div>
          </Col>
          <Row>
          <Col md="6" className="text-left">
            <FormGroup>
              <Button color="primary" size="sm">
                Save 
              </Button>
            </FormGroup>
          </Col>
          <Col md="6" className="text-right">
            <FormGroup>
              <Button color="primary" size="sm">
              Cancle
              </Button>
            </FormGroup>
          </Col>
          </Row>
        </Row>
      </Form>

      </ModalBody>
    
    </Modal>

    {/* emilid */}
    <Modal isOpen={emailid} toggle={EmailId}>
      <ModalHeader
        toggle={EmailId}
        close={
          <button className="close" onClick={EmailId}>
            <Icon name="cross" />
          </button>
        }
      >
        Enter Your New Email ID
      </ModalHeader>
      <ModalBody>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup>
              
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" size="sm">
                Sent OTP 
              </Button>
            </FormGroup>
       </Form>   
      </ModalBody>
     
    </Modal>

    {/* mobile */}
    <Modal isOpen={mobile} toggle={MobileNumber}>
      <ModalHeader
        toggle={MobileNumber}
        close={
          <button className="close" onClick={MobileNumber}>
            <Icon name="cross" />
          </button>
        }
      >
        Enter Your New Mobile Number
      </ModalHeader>
      <ModalBody>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup>
              
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" size="sm">
                Sent OTP 
              </Button>
            </FormGroup>
       </Form>   
      </ModalBody>
     
    </Modal>
    </div>
  );
};
export default OrderPoc;





