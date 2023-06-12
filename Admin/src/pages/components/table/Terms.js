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

const Terms = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse , setwarehouse] = useState(false);
  const Warehouse = () => {setwarehouse(!warehouse)};
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
          
        <Block className="container ">

          
            <Row>
                <Col md={6}>
                <p>Commission</p>
                </Col>
               
            </Row>
            <hr></hr>
        <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
       <Row>
    <Col md={6}>
    
    <Card className="card-bordered" >
  <CardBody className="card-inner" >
  <FormGroup>
                  <Label htmlFor="default-5" className="form-label">
                  Agreement Date
                  </Label>
                  <input
                    className="form-control"
                    disabled
                    defaultValue="04-May-2022 06:24"
                    placeholder="Input placeholder"
                  />
                </FormGroup>
    
    
    <CardText>
     <div className="row">
         <div className="col-md-12">
         <Badge color="outline-{primary}" className="badge-dim p-4">Commission Rate : &nbsp;<b style={{fontSize:"24px"}}>20</b><sub style={{fontSize:"16px"}}>%</sub> </Badge>
         </div>
       
     </div>
    


     <div className="row mt-2">
         <div className="col-md-12">
         <p >Thank you for accepting our <span style={{color: "#fc8181"}}>terms &amp; conditions</span> </p>
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
    {/* add warehouse */}
    <Modal size="lg" isOpen={warehouse} toggle={Warehouse}>
      <ModalHeader
        toggle={Warehouse}
        close={
          <button className="close" onClick={Warehouse}>
            <Icon name="cross" />
          </button>
        }
      >
       Add Warehouse Details
      </ModalHeader>
      <ModalBody>
       
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
            <FormGroup>
            <Label className="form-label" htmlFor="fv-subject">
            Address type/name*
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
            <Label className="form-label" htmlFor="fv-subject">
            Mobile* 
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
              Alternative Mobile  
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
              Read Me
              </Label>
              <div className="form-control-wrap">
                <textarea
              
                  type="text"
                  id="fv-email"
                  name="email"
                  className="form-control"
                  style={{minHeight:"30px"}}
                  placeholder="Address (House No / Flat No, Building Name, Area and Street)"
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </FormGroup>
          </Col>
          <Col md="6" className="mt-1">
          <FormGroup>
         
              <div className="form-control-wrap">
                <textarea
                  ref={register({ required: true })}
                  type="text"
                  id="fv-subject"
                  name="subject"
                  className="form-control"
                  style={{minHeight:"30px"}}
                  placeholder="Address Line 2"
                />
                {errors.subject && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6" className="pt-1 mt-0">
          <FormGroup>
             <Label className="form-label" htmlFor="fv-email">
             Select State
             </Label>
          <div className="form-control-wrap">
                <div className="form-control-select">
                  <select
                    ref={register({
                      required: true,
                    })}
                    className="form-control form-select"
                    id="fv-topics"
                    name="topics"
                    placeholder="Select a option"
                  >
                    <option label="Select State" value=""></option>
                    <option value="fv-gq">General Question</option>
                    <option value="fv-tq">Tachnical Question</option>
                    <option value="fv-ab">Account &amp; Billing</option>
                  </select>
                  {errors.topics && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
            <Label className="form-label" htmlFor="fv-subject">
            City* 
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
            <Label className="form-label" htmlFor="fv-subject">
            Pincode*
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
         
          <Col md="12">
          <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                  
                    id="customCheckaddress"
                  />
                  <label className="custom-control-label" htmlFor="customCheckaddress">
                  Mark As Default Address
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
    <Modal  isOpen={emailid} toggle={EmailId}>
   
      <ModalBody>
          
         <div className="container">
             <div className="row">
                 <div className="col-md-12 text-center">
                     <div >
                     <Icon name='alert-circle' color="primary" style={{fontSize:'60px'}}></Icon>
                     </div>
                     <div className="mt-2">
                         <h6>Are you sure?</h6>
                     </div>
                     <div className="mt-2 mb-2">
                         <p>You won't be able to revert this!?</p>
                     </div>
                     <Row>
          <Col md="6" className="text-right">
            <FormGroup>
              <Button color="primary" size="sm">
              Yes, delete it!
              </Button>
            </FormGroup>
          </Col>
          <Col md="6" className="text-left">
            <FormGroup>
              <Button color="primary" size="sm">
              Cancle
              </Button>
            </FormGroup>
          </Col>
          </Row>
                 </div>
             </div>
         </div>
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
export default Terms;





