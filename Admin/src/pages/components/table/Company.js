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
import {Card, CardHeader, CardFooter, Badge,Label,FormGroup,Form } from "reactstrap"


import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Company = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [files, setFiles] = useState([]);
  const [files1, setFiles1] = useState([]);
  const [GSTfile, setFilesGST] = useState([]);
  const [Foodfile, setFilesFood] = useState([]);
  const { errors, register, handleSubmit } = useForm();

  const [Registered , setRegistered] = useState(true)
  const Registeyes = () => setRegistered(!Registered)
  //gst
  const [GSTstate , setGSt] = useState(true)
  const GST = () => setGSt(!GSTstate)
  //food
  const [Foodstate , setFoodstate] = useState(true)
  const Foodproduct = () => setFoodstate(!Foodstate)

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
        <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
       <Row>
           <Col md={4}>
          
        <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
              Name of Business / Company 
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
        
            <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
              Business / Company Number
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
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                   
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="website" />
                  </div>
                </FormGroup>
           </Col>
           <Col md={4}>
           <FormGroup>
                  <Label htmlFor="default-textarea" className="form-label">
                  Address
                  </Label>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      type="textarea"
                      id="default-textarea"
                      defaultValue="Large text area content"
                    />
                  </div>
                </FormGroup>
           </Col>
           <Col md={4}>
          
        <Row className="g-gs">
         
          <Col md="12">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-topics">
                State
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
                    <option label="Select a topic" value=""></option>
                    <option value="fv-gq">General Question</option>
                    <option value="fv-tq">Tachnical Question</option>
                    <option value="fv-ab">Account &amp; Billing</option>
                  </select>
                  {errors.topics && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
        <Col md="12">
        <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
                City
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
        <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
                Pincode
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
    </Row>
      
           </Col>
           </Row>
           <Row className="mt-3">

           <Col md={4}>
           <FormGroup>
               <Label>Are You A Registered Company?*</Label>
                    <ul className="custom-control-group g-3 align-center flex-wrap">
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            defaultChecked
                            name="reg-public"
                            id="reg-enable"
                            onClick={Registeyes}
                          />
                          <label className="custom-control-label" htmlFor="reg-enable">
                           yes
                          </label>
                        </div>
                      </li>
                  
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="reg-public"
                            id="reg-request"
                            onClick={Registeyes}
                          />
                          <label className="custom-control-label" htmlFor="reg-request">
                            No
                          </label>
                        </div>
                      </li>
                    </ul>
                  
                  </FormGroup>
                  <div className="row row m-0 p-2" style={{backgroundColor: "#fff0f0"}}>
                      <div className="col-md-12">
                      {Registered ? 
                    <div>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <p>Type Of The Company*</p>
                            </div>
                            <div className="col-md-12">
                          
                  <div className="row">
                  <div className="col-md-12 mb-1">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input  custom-control-sm" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">
                    LLP
                    </label>
                  </div>
                  </div>
                  <div className="col-md-12 mb-1">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck2" />
                    <label className="custom-control-label" htmlFor="customCheck2">
                    Private Limited
                    </label>
                  </div>
                  </div>
                  <div className="col-md-12 mb-1">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck3" />
                    <label className="custom-control-label" htmlFor="customCheck3">
                    Public Limited
                    </label>
                  </div>
                  </div>
                  <div className="col-md-12 mb-1">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck4" />
                    <label className="custom-control-label" htmlFor="customCheck4">
                    Sole Proprietorship
                    </label>
                  </div>
                  </div>
                  <div className="col-md-12 mb-2">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck5" />
                    <label className="custom-control-label" htmlFor="customCheck5">
                    Partnership
                    </label>
                  </div>
                  </div>
                  <div className="col-md-12 mb-2">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input form-control" id="customCheck6" />
                    <label className="custom-control-label" htmlFor="customCheck6">
                    Others
                    </label>
                  </div>
                  </div>
                           <div className="col-md-12 mb-2">
                           <label className="form-label">Upload Registration Certificate</label>
                           <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {files.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                            </div>    
                            <div className="col-md-12">
                            <input className="form-control" placeholder="CIN"/>
                             </div>   


                  </div>
               
                            </div>
                        </div>
                    </div>                    
                    
                    : 
                    <div>
                         <div className="row">
                         <div className="col-md-12 mb-2">
                            <input className="form-control" placeholder="PAN Card Number"/>
                             </div>
                           <div className="col-md-12 mb-2">
                           <label className="form-label">Upload Pancard</label>
                           <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles, setFiles1)}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files1.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {files1.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                            </div>    
                               


                  </div>
                     </div>   
                        }
                      </div>
                  </div>
           </Col>

           <Col md={4}>
           <FormGroup>
               <Label>Are You GST Registered?*
</Label>
                    <ul className="custom-control-group g-3 align-center flex-wrap">
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            defaultChecked
                            name="reg-public1"
                            id="reg-enable1"
                            onClick={GST}
                          />
                          <label className="custom-control-label" htmlFor="reg-enable1">
                           yes
                          </label>
                        </div>
                      </li>
                  
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="reg-public1"
                            id="reg-request1"
                            onClick={GST}
                          />
                          <label className="custom-control-label" htmlFor="reg-request1">
                            No
                          </label>
                        </div>
                      </li>
                    </ul>
                  
                  </FormGroup>
                  <div className="row row m-0 p-2" style={{backgroundColor: "#fff0f0"}}>
                      <div className="col-md-12">
                      {GSTstate ? 
                    <div>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                            <FormGroup>
                  <Label htmlFor="default-0" className="form-label">
                    GSTIN*
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Input placeholder" />
                  </div>
                </FormGroup>
                            </div>
                            <div className="col-md-12 mb-2">
                           <label className="form-label">Upload Registration Certificate</label>
                           <Dropzone
                  onDrop={(acceptedFiles) => handleDropChangeGST(acceptedFiles, setFilesGST)}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {GSTfile.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {GSTfile.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                            </div>  
                        </div>
                    </div>                    
                    
                    : 
                   ""
                        }
                      </div>
                  </div>
           </Col>

           <Col md={4}>
           <FormGroup>
               <Label>Are You Selling Food Product ?*

</Label>
                    <ul className="custom-control-group g-3 align-center flex-wrap">
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            defaultChecked
                            name="reg-public2"
                            id="reg-enable3"
                            onClick={Foodproduct}
                          />
                          <label className="custom-control-label" htmlFor="reg-enable3">
                           yes
                          </label>
                        </div>
                      </li>
                  
                      <li>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="reg-public2"
                            id="reg-request3"
                            onClick={Foodproduct}
                          />
                          <label className="custom-control-label" htmlFor="reg-request3">
                            No
                          </label>
                        </div>
                      </li>
                    </ul>
                  
                  </FormGroup>
                  <div className="row m-0 p-2" style={{backgroundColor: "#fff0f0"}}>
                      <div className="col-md-12">
                      {Foodstate ? 
                    <div>
                        <div className="row" >
                           
                            <div className="col-md-12 mb-2">
                           <label className="form-label">Upload Food Certificate*</label>
                           <Dropzone
                  onDrop={(acceptedFiles) => handleDropChangeFood(acceptedFiles, setFilesFood)}
                  accept={[".jpg", ".png", ".svg"]}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {Foodfile.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button color="primary">SELECT</Button>
                          </div>
                        )}
                        {Foodfile.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={file.preview} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                            </div>  
                        </div>
                    </div>                    
                    
                    : 
                   ""
                        }
                      </div>
                  </div>
           </Col>

           </Row>
          
           <Col md={12} className="text-right">
            <FormGroup>
              <Button color="primary" size="lg">
                Save Information
              </Button>
            </FormGroup>
          </Col>

       </Form>
       
        </Block>
   
       
    </React.Fragment>
    
    </div>
  );
};
export default Company;
