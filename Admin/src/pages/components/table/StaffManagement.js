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
  ReactDataTable
} from "../../../components/Component";
import {Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Badge,Label,FormGroup,Form,Modal,ModalHeader ,ModalBody,ModalFooter } from "reactstrap"


import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StaffManagement = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse , setwarehouse] = useState(false);
  const Warehouse = () => {setwarehouse(!warehouse)};
  const [emailid , setemailid] = useState(false);
  const EmailId = () => {setemailid(!emailid)};
  const [mobile , setmobile] = useState(false);
  const MobileNumber = () => {setmobile(!mobile)};
  const { errors, register, handleSubmit } = useForm();

  const [isOpen , setIsOpen] = useState(false);

  const toggle = () => {setIsOpen(!isOpen)};

  const onFormSubmit = (e) => {};
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  
//   const FormValidationComponent = ({ alter, id }) => {
//     const { errors, register, handleSubmit } = useForm();
//     const onFormSubmit = (e) => {};
//     const formClass = classNames({
//       "form-validate": true,
//       "is-alter": alter,
//     });
//   }

   const dataTableColumns = [
    {
      name: "ID",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.age,
      sortable: true,
     
    },
    {
      name: "EmailAddress",
      selector: (row) => row.gender,
      sortable: true,
      
    },
    {
      name: "Phonenumber",
      selector: (row) => row.company,
      sortable: true,
      
    },
    {
      name: "Designation",
      selector: (row) => row.startDate,
      sortable: true,
      
    },
    {
      name: "Roles",
      selector: (row) => row.salary,
      sortable: true,
      
    },
    {
        name: "Action",
        selector: (row) => row.salary,
        sortable: true,
        
      },
  ];

 const DataTableData = [
    {
      ID: 1,
      Name: "Francine Kirby",
      EmailAddress: "info@gmail.com",
      Phonenumber: "7896541236",
      Designation: "BUZZWORKS",
      Roles: "2017-02-17",
      Action: "Active",
    },
 
  ];
 
  return (
      <div>
    <React.Fragment>
      <Head title="Overview"></Head>
          
        <Block className="container ">

          
            <Row>
                <Col md={12} className="text-right mb-3">
                <Button color="primary" onClick={toggle}><Icon name="plus"></Icon>&nbsp;Add New Staff</Button>
                </Col>
                <Col md={12}>
                <ReactDataTable data={DataTableData} columns={dataTableColumns}  pagination actions />
                </Col>
               
            </Row>
            <hr></hr>
            <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        close={
          <button className="close" onClick={toggle}>
            <Icon name="cross" />
          </button>
        }
      >
       Add New Staff
      </ModalHeader>
      <ModalBody>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
                Full Name
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
                Email address
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
               MobileNumber
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
          <Col md="6" className="mt-0 pt-0">
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
          <Col md="12">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-message">
                Address
              </Label>
              <div className="form-control-wrap">
                <textarea
                  ref={register({
                    required: true,
                  })}
                  type="textarea"
                  className="form-control form-control-sm"
                  id="fv-message"
                  name="message"
                  placeholder="Write your message"
                />
                {errors.message && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="12">
          <FormGroup>
              <Label className="form-label" htmlFor="fv-topics">
               select Role
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
                    <option label="No Result Found" value="">No Result Found</option>
                   
                  </select>
                  {errors.topics && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Button color="primary" size="lg">
              Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      </ModalBody>
      
    </Modal>
     
        </Block>
   
       
    </React.Fragment>
 


    </div>
  );
};
export default StaffManagement;





