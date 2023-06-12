import React, { Fragment, useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import './Profile.css'

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
  RSelect
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge } from "reactstrap"
import { FormGroup, Label, Input, } from "reactstrap";
import Dropzone from "react-dropzone";

import User1 from '../../../images/avatar/a-sm.jpg'
import './Profile.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from "reactstrap"
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL, API_Banner, token } from "../../../Api";
const Role_Api = `${API_URL}/admin/userRoles`;
const API_View = `${API_URL}/Admin_Staff`;
const API_STAFF = `${API_URL}/admin/users`
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const BasicInfo = () => {
  const [sm, updateSm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [tooltipOpen, settooltipOpen] = useState(false);
  const toggle2 = () => { settooltipOpen(!tooltipOpen) };
  const [StoreName, setStoreName] = useState(false);
  const toggle3 = () => { setStoreName(!StoreName) };
  const [ShopUrlName, setShopUrlName] = useState(false);
  const toggle4 = () => { setShopUrlName(!ShopUrlName) };
  const [files, setFiles] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies();
  const [rolename, setRolename] = useState();
  const [roleadd, setRoleadd] = useState();
  const [staffData, setStaffData] = useState({
    fullname: "",
    email: "",
    Avatar: "",
    role_id: "",
    phone: "",
    lastname: ""
  });

  const CookieID = cookies.user_id;
  console.log("CookieID", CookieID);

  useEffect(() => {
    getData();
    // GetRole();
  }, [])

  const getData = async () => {
    let Result = await axios.get(`${API_STAFF}/${CookieID}`, config);
    console.log("resultt", Result.data.list);
    setStaffData({
      email: Result.data.list[0].emailaddress,
      fullname: Result.data.list[0].fullname,
      lastname: Result.data.list[0].lastname,
      phone: Result.data.list[0].phone,
      role_id: Result.data.list[0].role_id,
      Avatar: Result.data.list[0].Avatar,
    })

    let Results = await axios.get(`${Role_Api}/${Result.data.list[0].role_id}`, config);
    console.log("result", Results.data.list[0])
    setRolename({ label: Results.data.list[0].role_name, value: Results.data.list[0].role_id });
  }

  //file upload
  // const handleDropChange = (acceptedFiles, set) => {
  //   set(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };
  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>


        <Block>
          {/* <Row className="container ">
            <Col md={5} >
              <div className="p-3">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <h6>Registration Details:</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pt-0">
                        Username
                      </Label>
                      <div className="row">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text" defaultValue="info@babyamore.in" id="default-0" disabled placeholder="Username" />

                          </div>
                        </div>
                        <div className="col-md-2">
                          <Button onClick={toggle}><Icon name="edit"></Icon></Button>
                        </div>

                      </div>

                    </FormGroup>
                  </div>
                  <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader
                      toggle={toggle}
                      close={
                        <button className="close" onClick={toggle}>
                          <Icon name="cross" />
                        </button>
                      }
                    >
                      Enter Your New Email ID
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">

                        <div className="col-md-12 text-center  mb-1">
                          <input className="form-control" type="text" id="default-0" placeholder="Enter Your New Email ID" />
                        </div>
                        <div className="col-md-12 text-center">
                          <Button color="primary">Send Otp</Button>
                        </div>
                      </div>
                    </ModalBody>

                  </Modal>
                </div>
                <div className="row mt-2">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pb-0">
                        Mobile Number
                      </Label>
                      <div className="row pt-0">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text" defaultValue="9876543212" id="default-0" disabled placeholder="9876543212" />

                          </div>
                        </div>
                        <div className="col-md-2">
                          <Button onClick={toggle1}><Icon name="edit"></Icon></Button>
                        </div>

                      </div>

                    </FormGroup>
                  </div>
                  <Modal isOpen={isOpen1} toggle={toggle1}>
                    <ModalHeader
                      toggle={toggle1}
                      close={
                        <button className="close" onClick={toggle1}>
                          <Icon name="cross" />
                        </button>
                      }
                    >
                      Enter Your New Mobile Number
                    </ModalHeader>
                    <ModalBody>
                      <div className="row">

                        <div className="col-md-12 text-center  mb-1">
                          <input className="form-control" type="text" id="default-0" placeholder="Enter Your New Mobile Number" />
                        </div>
                        <div className="col-md-12 text-center">
                          <Button color="primary">Send Otp</Button>
                        </div>
                      </div>
                    </ModalBody>

                  </Modal>
                </div>
                <div className="row mt-2">
                  <div className="col-md-10">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label pb-0">
                        Name
                      </Label>
                      <div className="row pt-0">
                        <div className="col-md-10">
                          <div className="form-control-wrap">
                            <input className="form-control" type="text" defaultValue="Hameed Imthad" id="default-0" placeholder="Hameed Imthad" />

                          </div>
                        </div>
                        <div className="col-md-2">
                          <Button id="id"><Icon name="question"></Icon> </Button>
                          <Tooltip placement="top" isOpen={tooltipOpen} target="id" toggle={toggle2}>
                            Enter brand name for your products if you sell your own branded products
                          </Tooltip>
                        </div>

                      </div>

                    </FormGroup>
                  </div>

                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className="p-3">
                <div className="row ">
                  <div className="col-md-12">
                    <h6>Store Information</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>
                              <Label htmlFor="default-0" className="form-label pb-0">
                                Store Name
                              </Label>
                              <div className="row pt-0">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <input className="form-control" type="text" defaultValue="Hameed Imthad" id="default-0" placeholder="Hameed Imthad" />

                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <Button id="StoreName"><Icon name="question"></Icon> </Button>
                                  <Tooltip placement="top" isOpen={StoreName} target="StoreName" toggle={toggle3}>
                                    Enter brand name for your products if you sell your own branded products
                                  </Tooltip>
                                </div>

                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>

                              <div className="row pt-0 mt-2">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <textarea className="form-control" type="text" rows="2" placeholder="About Store / Company" style={{ minHeight: '30px' }} />

                                  </div>
                                </div>


                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <FormGroup>
                              <Label htmlFor="default-0" className="form-label pb-0">
                                Shop Url Name
                              </Label>
                              <div className="row pt-0">
                                <div className="col-md-10">
                                  <div className="form-control-wrap">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">
                                          https://example.com/users/
                                        </span>
                                      </div>
                                      <input type="text" className="form-control" required="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <Button id="ShopUrlName"><Icon name="question"></Icon> </Button>
                                  <Tooltip placement="top" isOpen={ShopUrlName} target="ShopUrlName" toggle={toggle4}>
                                    Enter brand name for your products if you sell your own branded products
                                  </Tooltip>
                                </div>

                              </div>

                            </FormGroup>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-10 mt-2">
                        <label className="form-label">Store Logo</label>
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

                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} className="text-right">
              <FormGroup>
                <Button color="primary" size="lg">
                  Save Information
                </Button>
              </FormGroup>
            </Col>
          </Row> */}

          <Row className="g-4">
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  First Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    value={staffData.fullname}
                    readOnly
                  />

                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  Last Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={staffData.lastname}
                    readOnly
                  />

                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  Email Address
                </label>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={staffData.email}
                    readOnly
                  />

                </div>
              </div>
            </Col>

            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  Mobile Number
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={staffData.phone}
                    readOnly
                  />
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  Role
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    name="role_id"
                    value={rolename}
                    isDisabled={true}
                    placeholder="Select"
                    required
                  />
                </div>
              </div>
            </Col>
            <Col md="6">
              <label className="form-label">Image</label>


              <Dropzone
                onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFiles)}
                accept={[".jpg", ".png", ".svg"]}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="dropzone upload-zone small dz-clickable p-0" >
                      <input {...getInputProps()} required />
                      {files.length === 0 && (
                        <div className="dz-message">
                          <span className="dz-message-text">Drag & Drop a File</span>
                          <span className="dz-message-or">or</span>
                          <span>Upload</span>
                        </div>
                      )}
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                        >
                          <div className="dz-image">
                            {(() => {
                              if (file.image) {
                                return <img src={`${API_View}/${file.image}`} alt="preview" />
                              } else if (file.preview) {
                                return <img src={file.preview} alt="preview" />
                              }

                              else {
                                return (
                                  <div className="dz-message">
                                    <span className="dz-message-text">Drag & Drop to Upload File</span>
                                    <span className="dz-message-or">or</span>
                                    <Button color="primary">Upload</Button>
                                  </div>
                                )
                              }
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </Dropzone>



            </Col>
            {/* <Col md='6'>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </Col> */}
            
            <Col md="6">
              <div className="form-group">
                <label className="form-label" htmlFor="customer">
                  Status
                </label>
                <div className="form-control-wrap">
                  <RSelect
                    // value={status}
                    placeholder="Select"
                    required
                    isDisabled={true}
                  />
                </div>
              </div>
            </Col>


          </Row>

        </Block>


      </React.Fragment>

    </div>
  );
};
export default BasicInfo;
