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

const Bank = ({ alter, id }) => {
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
              Name of Account Holder * 
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                  placeholder="Name of Account Holder "
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
        
            <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
              Confirm Account Number *
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                  placeholder="Confirm Account Number "
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>

                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                  Swift Code
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Swift Code" />
                  </div>
                </FormGroup>
           </Col>
           <Col md={4} clas>
           <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                  Bank Name *
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Bank Name" />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
                <FormGroup className="mt-0 pt-0">
                  <Label htmlFor="default-0" className="form-label">
                  Branch Name *
                  </Label>
                  <div className="form-control-wrap">
                    <input className="form-control" type="text" id="default-0" placeholder="Branch Name" />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
                
                <FormGroup className="mt-0 pt-0">
                <Label htmlFor="default-0" className="form-label">
                Upload Cheque
                  </Label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                  accept={[".jpg", ".png", ".svg"]} className="m-2 p-2"
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
                </FormGroup>

           </Col>
           <Col md={4}>
          
        <Row className="g-gs">
         
          <Col md="12">
            <FormGroup>
              <Label className="form-label" htmlFor="fv-topics">
              Account Number *
              </Label>
              <div className="form-control-wrap">
                <div >
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="fullname"
                  className="form-control"
                  placeholder="Name of Account Holder "
                />
                  {errors.topics && <span className="invalid">This field is required</span>}
                </div>
              </div>
            </FormGroup>
          </Col>
        <Col md="12 mt-0 pt-0">
        <FormGroup>
              <Label className="form-label" htmlFor="fv-full-name">
              IFSC Code *
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
export default Bank;
