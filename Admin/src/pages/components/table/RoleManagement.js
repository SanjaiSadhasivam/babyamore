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
import {Collapse,Card, CardHeader, CardFooter, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardLink, Badge,Label,FormGroup,Form,Modal,ModalHeader ,ModalBody,ModalFooter } from "reactstrap"


import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RoleManagement = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);

  
  const { errors, register, handleSubmit } = useForm();
  const [isOpen , setIsOpen] = useState(false);
  const [open, setIsopen] = useState();
  const toggle = () => {setIsOpen(!isOpen)};
 

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

   const dataTableColumns = [
    {
      name: "ID",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.age,
      sortable: true,
      hide: 370,
    },
    
       
    {
        name: "Action",
        selector: (row) => row.salary,
        sortable: true,
        hide: "md",
      },
  ];

 const DataTableData = [
    {
        ID: 0,
      Role: "2017-02-17",
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
                <Button color="primary" onClick={toggle}><Icon name="plus"></Icon>&nbsp;Add New Role</Button>
                </Col>
                <Col md={12}>
                <ReactDataTable data={DataTableData} columns={dataTableColumns}  pagination actions />
                </Col>
               
            </Row>
            <hr></hr>
        
     
        </Block>
   
        <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader
        toggle={toggle}
        close={
          <button className="close" onClick={toggle}>
            <Icon name="cross" />
          </button>
        }
      >
      Add New Role
      </ModalHeader>
      <ModalBody>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="12">
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
        
          <Col md={12}>
              <h6>Permissions *</h6>
          <div className="accordion">
        <div className="accordion-item">
          <div
            className= "accordion-head"
            onClick={() => setIsopen("1")}
          >
            <p className="title">Products</p>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={open === "1" ? true : false}
          >
            <div className="accordion-inner">
           
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsopen("2")}
          >
            <p className="title">
            Orders
            </p>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={open === "2" ? true : false}
          >
            <div className="accordion-inner">
             
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsopen("3")}
          >
            <p className="title">
            Payments
            </p>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={open === "3" ? true : false}
          >
            <div className="accordion-inner">
            
            </div>
          </Collapse>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-head collapsed"
            onClick={() => setIsopen("4")}
          >
            <p className="title">Store</p>
            <span className="accordion-icon"></span>
          </div>
          <Collapse
            className="accordion-body"
            isOpen={open === "4" ? true : false}
          >
            <div className="accordion-inner">
             
            </div>
          </Collapse>
        </div>
      </div>
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
    </React.Fragment>
 


    </div>
  );
};
export default RoleManagement;





