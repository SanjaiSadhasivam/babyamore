import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  BackTo,
  PreviewCard,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../components/Component";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import cream from "../../../assets/images/jsTree/cream.jpg";
import diapers from "../../../assets/images/jsTree/diapers.jpg";
import nappycleaning from "../../../assets/images/jsTree/nappycleaning.jpg";
import { Tooltip, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";

import "../../../components/partials/default/Custom.css";
// import Invoice from "./Invoice";
import './Custom.css';
const CancelStatus2 = () => {
  //model for assign delevery boy  
  const [isOpendelivery, setIsOpendelivery] = useState(false);
  const Delivery = () => { setIsOpendelivery(!isOpendelivery) };
  //model for admin note
  const [isOpenadminNote, setIsOpenadminNote] = useState(false);
  const addadminnote = () => { setIsOpenadminNote(!isOpenadminNote) };
  //tooltip for admin
  const [tooltipOpenadmin, settooltipadmin] = useState(false);
  const Admintooltipadmin = () => { settooltipadmin(!tooltipOpenadmin) };
  const [state, setState] = useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };
  const [smOption, setSmOption] = useState(false);
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const [odstatus, setOdstatus] = useState();

  return (
    <div className="row">
      <div className="col-md-12">
        <Card >
          <div className="container-fluid">

            <div className="row">

              <div className="col-md-12 p-3 alert alert-secondary border-0 d-flex">
                <h5 className="mr-2 mb-0">Order ID : <b>OD_001_001</b></h5>
                <h6>Order Date: <b>28-12-20222</b></h6>
              </div>

              {/* <div className="col-md-5  pt-2">
              <Button className="btn-dim" color="primary" onClick={Delivery}>
                <Icon name="user-fill" />
                <span>Assign Delivery Boy</span>

              </Button>
             </div> */}

              {/* dropdown strats */}

              {/* <FormGroup>
                <div className="form-control-wrap mt-2">
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
                      <option label="Order Status" value=""></option>
                      <option value="fv-gq">General Question</option>
                      <option value="fv-tq">Tachnical Question</option>
                      <option value="fv-ab">Account &amp; Billing</option>
                    </select>
                    {errors.topics && <span className="invalid">This field is required</span>}
                  </div>
                </div>
              </FormGroup> */}
              {/* <div className="col-md-5 d-flex mt-2">
                <div>
                  <span style={{ margin: "0", padding: "10px 0", width: "10%" }}>ORDER STATUS</span>
                </div>
                <div className="">

                  <select value={odstatus} className=" btn hoveffz d-md-inline" style={{ backgroundColor: "#fc8181", color: "#fff" }}
                    onChange={(e) => setOdstatus(e.target.value)}>

                    
                   <option className="dropdown_list" value="New orders">New orders</option>
                    <option className="dropdown_list" value="Preparing">Preparing</option>
                    <option className="dropdown_list" value="Ready to Handovereli"> Ready to Handover</option> 
                    <option className="dropdown_list" value="Shipped">Shipped</option>
                    <option className="dropdown_list" value="Completed">Completed</option>
                    <option className="dropdown_list" value="RTO In-transit">RTO In-transit</option>
                    <option className="dropdown_list" value="Returned"> Returned</option>
                    <option className="dropdown_list" value="Refunded"> Refunded</option>
                    <option className="dropdown_list" value="Partially refunded"> Partially refunded</option>
                    <option className="dropdown_list" value="Lost (AWB)"> Lost (AWB)</option>
                    <option className="dropdown_list" value="Cancelled"> Cancelled</option>
                  </select>

                </div>
              </div> */}

              {/* dropdown Ends */}

              {/* <div className="col-md-3 text-left pt-3">
                <Badge color="primary">WAITING FOR PAYMENT</Badge>
              </div> */}
              {/* model for assign delevery boy */}
              <Modal isOpen={isOpendelivery} toggle={Delivery}>
                <ModalHeader
                  toggle={Delivery}
                  close={
                    <button className="close" onClick={Delivery}>
                      <Icon name="cross" />
                    </button>
                  }
                >
                  ASSIGN DELIVERY BOY
                </ModalHeader>
                <ModalBody>
                  <RSelect


                    options={[
                      { value: "", label: "Select" },
                      { value: "Herzog", label: "Herzog" },


                    ]}



                  />
                </ModalBody>
                <ModalFooter >
                  <Button color="primary">Proceed</Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-md-8 p-3">
              <h5>Payment: Credit</h5>
              Transaction id : 2562426 <br />

              Customer IP : 654896
            </div>
            <div className="col-md-4 pt-3">
              <h6>Status</h6>
              <select value={odstatus} className=" btn hoveffz d-md-inline" style={{ backgroundColor: "#fc8181", color: "#fff", width: "154px" }}
                onChange={(e) => setOdstatus(e.target.value)}>

                <option className="dropdown_list" value="New orders" style={{ backgroundColor: "white", color: "red" }}>Cancel</option>
                {/* <option className="dropdown_list" value="Preparing" style={{ backgroundColor: "white", color: "red" }}>Intransit</option> */}
                {/* <option className="dropdown_li/st" value="Ready to Handovereli" style={{ backgroundColor: "white", color: "red" }}>Rejected</option> */}

              </select>

              {/* </div> */}
            </div>
          </div>
        </Card>

        <Card >
          <div className="card-inner">

            <div className="card-title-group mb-2">
              <div className="card-header w-100 mb-1">
                <h5 className="title">Order details</h5>
              </div>


            </div>


            <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
              <ModalBody>
                <a href="#cancel" className="close">
                  {" "}
                  <Icon
                    name="cross-sm"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onFormCancel();
                    }}
                  ></Icon>
                </a>
                <div className="p-2">
                  <h5 className="title">FORM</h5>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <Row className="g-3">
                        <Col md="8">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              FULL NAME
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the Full Name"
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>

                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              STATUS*
                            </label>
                            <div className="form-control-wrap">
                              <RSelect


                                options={[
                                  { value: "ACTIVE", label: "ACTIVE" },
                                  { value: "INACTIVE", label: "INACTIVE" },


                                ]}
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}

                              />
                            </div>
                            {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              NICE NAME*
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"

                                placeholder="Enter the Nice Name"
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}

                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                            </div>

                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              EMAIL ADDRESS
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"

                                placeholder="Enter a Vaild Email Address"
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              PASSWORD*
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"

                                placeholder="Password"
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              CONFIRM PASSWORD*
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"

                                placeholder="Confirm Password"
                                name="customer"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>

                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="status">
                              ROLE*
                            </label>
                            <div className="form-control-wrap">
                              <RSelect


                                options={[
                                  { value: "ADMIN", label: "ADMIN" },
                                  { value: "SUPER ADMIN", label: "SUPER ADMIN" },


                                ]}
                                name="status"
                                ref={register({ required: "This is required" })}
                                defaultValue={formData.status}
                              />
                              {errors.status && <span className="invalid">{errors.status.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="date">
                              DATE OF BIRTH
                            </label>
                            <div className="form-control-wrap">
                              <DatePicker
                                selected={formData.date}
                                className="form-control"
                                ref={register({ required: "This is required" })}
                                onChange={(e) => setFormData({ ...formData, date: e.value })}
                                defaultValue={formData.date}

                              />
                              {errors.date && <span className="invalid">{errors.date.message}</span>}
                            </div>
                          </div>
                        </Col>



                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="status">
                              GENDER*
                            </label>
                            <div className="form-control-wrap">
                              <RSelect

                                options={[
                                  { value: "MALE", label: "MALE" },
                                  { value: "FEMALE", label: "FEMALE" },


                                ]}
                                name="status"

                                onChange={(e) => setFormData({ ...formData, status: e.value })}
                                defaultValue={formData.status}
                              />
                              {errors.status && <span className="invalid">{errors.status.message}</span>}
                            </div>
                          </div>
                        </Col>




                        <Col size="12">
                          <FormGroup>
                            <label className="form-label">DESCRIPTION </label>
                            <div className="text-editor" style={{ minHeight: '100px', }}>
                              <EditorToolbar />
                              <ReactQuill
                                theme="snow"
                                value={state.value}
                                onChange={handleChange}
                                placeholder={"Write something awesome..."}
                                modules={modules}
                                formats={formats}

                              />
                            </div>
                            {errors.description && <span className="invalid">{errors.description.message}</span>}
                          </FormGroup>
                        </Col>


                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              ADDRESS LINE 1*
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                name=" customer"
                                placeholder="Address Line 1"
                                onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}

                            </div>
                          </div>
                        </Col>

                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              ADDRESS LINE 2*
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"

                                placeholder="Address Line 2"
                                name="customer"
                                onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              CITY
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                name=" customer"
                                placeholder="City"
                                onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                defaultValue={formData.customer}

                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              ZIP/POSTAL CODE
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                name=" customer"
                                placeholder="Zip/Postal Code"
                                onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                defaultValue={formData.customer}

                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                            </div>
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="form-group">
                            <label className="form-label" htmlFor="customer">
                              PHONE
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                name=" customer"
                                placeholder=" Phone Number"
                                onChange={(e) => setFormData({ ...formData, customer: e.value })}
                                defaultValue={formData.customer}
                              />
                              {errors.customer && <span className="invalid">{errors.customer.message}</span>}


                            </div>
                          </div>
                        </Col>

                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="status">
                              COUNTRY*
                            </label>
                            <div className="form-control-wrap">
                              <RSelect
                                name="status"
                                options={[
                                  { value: "INDIA", label: "INDIA" },
                                  { value: "CHINA", label: "CHINA" },
                                  { value: "AFRICA", label: "AFRICA" },
                                  { value: "LONDON", label: "LONDON" },


                                ]}
                                onChange={(e) => setFormData({ ...formData, status: e.value })}
                                defaultValue={formData.status}
                              />
                              {errors.status && <span className="invalid">{errors.status.message}</span>}

                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="status">

                              STATE/PROVINCE/REGION*
                            </label>
                            <div className="form-control-wrap">
                              <RSelect
                                name="status"
                                options={[
                                  { value: "TAMIL NADU", label: "TAMIL NADU" },
                                  { value: "DELHI", label: "DELHI" },


                                ]}
                                onChange={(e) => setFormData({ ...formData, status: e.value })}
                                defaultValue={formData.status}
                              />
                              {errors.status && <span className="invalid">{errors.status.message}</span>}

                            </div>
                          </div>
                        </Col>

                        <Col size="12">

                          <label className="form-label">AVATAR</label>
                          <Dropzone onDrop={(acceptedFiles) => handleDropChange1(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                              <section>
                                <div
                                  {...getRootProps()}
                                  className="dropzone upload-zone small my-2 dz-clickable"
                                >
                                  <input {...getInputProps()} />
                                  {files1.length === 0 && <p>Brand Logo</p>}
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
                        </Col>


                        <Col size="12" >
                          <Button color="primary" type="submit">

                            <span>SAVE</span>
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            {/*order start*/}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="shipdea">


                  <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-6">
                      <h6>Order id : OD_001_001</h6>
                      <span class="d-block">Vendor : Nazar Enterprises</span>
                      <span>Warehouses : Chennai</span>
                      {/* <span class="d-block mt-2 mb-1"><img className="imgcour" src="https://uploads-ssl.webflow.com/5ef27cb65411b70949a151e9/5f17078fcfae300fc5b3d69c_download%20(16).png" /></span> */}
                    </div>
                    <div className="col-md-6 text-right">
                      <Button size="sm" className="btn-dim" color="dark" style={{fontSize:"9px"}}>Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon></Button><br></br>
                      <Button size="sm" className="btn-dim mt-2 font-weight-bold" color="dark" style={{fontSize:"9px"}}>Download CreditNotes &nbsp;<Icon name="arrow-to-down"></Icon></Button>
                    </div>

                    {/* <div className="col-md-6 hh-grayBox pt45 pb20">
                      <div className="row justify-content-between">
                        <div className="order-tracking completed">
                          <span className="is-complete"></span>
                          <p>Ordered<span className="d-block">Mon, June 24</span></p>
                        </div>
                        <div className="order-tracking completed">
                          <span className="is-complete"></span>
                          <p>Shipped<span className="d-block">Tue, June 25</span></p>
                        </div>
                        <div className="order-tracking">
                          <span className="is-complete"></span>
                          <p>Delivered<span className="d-block">Fri, June 28</span></p>
                        </div>
                      </div>
                    </div> */}




                  </div>

                  {/* <div className="row d-flex justify-content-between">
                    <div className="col-md-6">
                      <span className="btn btn-success fw-normal fs-6 p-1 mr-2">Delivered</span>
                      <span className="btn btn-outline-success fw-normal p-1">Track Shipment</span>
                    </div>

                    <div className="col-md-6 text-right">
                      <Button size="sm" className="btn-dim" color="dark">Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon></Button>
                      <Button size="sm" className="btn-dim mt-2" color="dark">Download CreditNotes &nbsp;<Icon name="arrow-to-down"></Icon></Button>

                    </div>
                  </div> */}




                  <div className="alert alert-success p-1 mt-2 mb-2">
                    Delivered on Tue, Sep 28
                  </div>




                </div>

                <div className="row p-0">


                  <div className="col-md-12 d-flex justify-content-between mb-2">
                    <div className="prod-com d-flex ">
                      <div className="images1">
                        <img src={cream} className="border-radius-50 imagprod border mr-2"></img>
                      </div>

                      <div>
                        <h5 className="mb-1 fs-6">Cream & Powders Cream & Powders</h5>
                        <h6 className="mb-1 fs-6">Quantity : 15</h6>
                        <span>Price : INR 1400</span>
                        <span>Sku : ORAJ_003</span>
                        <span>HSN Code: 33061020</span>
                        <span>EAN: 310310339739</span>
                      </div>
                    </div>
                    <div className="gst-com pr-4 pt-3">
                      <span className="d-block">Total : ₹342.37</span>
                      <span className="d-block">18% GST :  ₹61.63	</span>
                      <span className="d-block">12% GST : </span>
                    </div>

                  </div>

                  {/* <div className="col-md-12 d-flex mb-3">

                    <div className="mr-3">
                      <select
                        name=""
                        // value={Company.State}
                        // onChange={onchange}
                        className="form-control form-select"
                        id="fv-topics"
                        placeholder="Select a option"
                        style={{ width: "150px" }}
                      >
                        <option label="select.." value=""></option>
                        <option label="select.." value=""></option>

                      </select>

                    </div>

                    <div>
                      <span className="btn btn-danger p-1 mr-5">Submit</span>
                    </div>
                  </div> */}


                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="prod-com d-flex ">
                      <div className="images1">
                        <img src={cream} className="border-radius-50 imagprod border mr-2"></img>
                      </div>

                      <div>
                        <h5 className="mb-1 fs-6">Cream & Powders Cream & Powders</h5>
                        <h6 className="mb-1 fs-6">Quantity : 15</h6>
                        <span>Price : INR 1400</span>
                        <span>Sku : ORAJ_003</span>
                        <span>HSN Code: 33061020</span>
                        <span>EAN: 310310339739</span>
                      </div>
                    </div>
                    <div className="gst-com pr-4 pt-3">
                      <span className="d-block">Total : ₹342.37</span>
                      <span className="d-block">18% GST :  ₹61.63	</span>
                      <span className="d-block">12% GST : </span>
                    </div>
                  </div>

                  {/* <div className="col-md-12 d-flex mb-3">

                    <div className="mr-3">
                      <select
                        name=""
                        // value={Company.State}
                        // onChange={onchange}
                        className="form-control form-select"
                        id="fv-topics"
                        placeholder="Select a option"
                        style={{ width: "150px" }}
                      >
                        <option label="select.." value=""></option>
                        <option label="select.." value=""></option>

                      </select>

                    </div>

                    <div>
                      <span className="btn btn-danger p-1 mr-5">Submit</span>
                    </div>
                  </div> */}



                </div>




              </div>
            </div>
            <div><hr /></div>
            {/*order end*/}

            {/*order start*/}
            {/* <div className="row mb-5 mt-2">
                            <div className="col-md-12">
                                <div className="shipdea pt-2">
                                    <div className="row d-flex justify-content-between mb-2">
                                        <div className="col-md-6">
                                            <h6>Order id : #BA001_02</h6>
                                            <span class="d-block">Vendor : Nazar Enterprises</span>
                                            <span class="d-block">Warehouses : Chennai</span>

                                            <span class="d-block mt-2 mb-1"><img className="imgcour" src="https://uploads-ssl.webflow.com/5ef27cb65411b70949a151e9/5f17078fcfae300fc5b3d69c_download%20(16).png" /></span>

                                        </div>


                                        <div className="col-md-6 hh-grayBox pt45 pb20">
                                            <div className="row justify-content-between">
                                                <div className="order-tracking completed">
                                                    <span className="is-complete"></span>
                                                    <p>Ordered<span className="d-block">Mon, June 24</span></p>
                                                </div>
                                                <div className="order-tracking completed">
                                                    <span className="is-complete"></span>
                                                    <p>Shipped<span className="d-block">Tue, June 25</span></p>
                                                </div>
                                                <div className="order-tracking">
                                                    <span className="is-complete"></span>
                                                    <p>Delivered<span className="d-block">Fri, June 28</span></p>
                                                </div>
                                            </div>
                                        </div>




                                    </div>



                                    <div className="alert alert-success p-1 mt-2 mb-2">
                                        Delivered on Tue, Sep 28
                                    </div>




                                </div>

                                <div className="row p-0  mb-4">


                                    <div className="col-md-12 d-flex justify-content-between mb-4">
                                        <div className="prod-com d-flex ">
                                            <div className="images1">
                                                <img src={cream} className="border-radius-50 imagprod border mr-2"></img>
                                            </div>

                                            <div>
                                                <h5 className="mb-1 fs-6">Cream & Powders Cream & Powders</h5>
                                                <span>Price : INR 1400</span>
                                                <span>Sku : ORAJ_003</span>
                                                <span>HSN Code: 33061020</span>
                                                <span>EAN: 310310339739</span>
                                            </div>
                                        </div>
                                        <div className="gst-com pr-4 pt-3">
                                            <span className="d-block">Total : ₹342.37</span>
                                            <span className="d-block">18% GST :  ₹61.63	</span>
                                            <span className="d-block">12% GST : </span>
                                        </div>
                                    </div>

                                    <div className="col-md-12 d-flex justify-content-between">
                                        <div className="prod-com d-flex ">
                                            <div className="images1">
                                                <img src={cream} className="border-radius-50 imagprod border mr-2"></img>
                                            </div>

                                            <div>
                                                <h5 className="mb-1 fs-6">Cream & Powders Cream & Powders</h5>
                                                <span>Price : INR 1400</span>
                                                <span>Sku : ORAJ_003</span>
                                                <span>HSN Code: 33061020</span>
                                                <span>EAN: 310310339739</span>
                                            </div>
                                        </div>
                                        <div className="gst-com pr-4 pt-3">
                                            <span className="d-block">Total : ₹342.37</span>
                                            <span className="d-block">18% GST :  ₹61.63	</span>
                                            <span className="d-block">12% GST : </span>
                                        </div>
                                    </div>



                                </div>




                            </div>
                        </div> */}
            <div><hr /></div>
            {/*order end*/}





            <div className="row d-none">

              <div className="col-md-12" style={{ overflow: "scroll" }}>
                {/* <Invoice /> */}
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">IMAGE</th>
                      <th scope="col">PRODUCT NAME</th>
                      <th scope="col">SKU</th>
                      <th scope="col">EAN</th>
                      <th scope="col">VENDOR NAME</th>
                      <th scope="col">EXPIRY</th>
                      <th scope="col">ATTRIBUTES</th>
                      <th scope="col">QTY</th>
                      <th scope="col">WAREHOUSE NAME</th>
                      <th scope="col">REGULAR PRICE</th>
                      <th scope="col">SOLD PRICE</th>
                      <th scope="col">GST PRICE</th>
                      <th scope="col">TRACKING NUMBER</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      <td>Cream & Powders</td>
                      <td>NV-010</td>
                      <td>123567891-NV</td>
                      <td>Navin</td>
                      <td>Aug 2023</td>
                      <td>250g</td>
                      <td>2</td>
                      <td>Guindy</td>
                      <td>INR 1200</td>
                      <td>INR 1100</td>
                      <td>INR 100</td>

                      <td>BA-001 </td>
                      <td><Badge color="primary">Delivered</Badge> </td>
                      <td>INR 1400</td>
                    </tr>
                    <tr>
                      <th><img src={diapers} className="border-radius-50" style={{ borderRadius: '50%', width: '50%', height: '50%' }}></img></th>
                      <td>Diapers & Pants</td>
                      <td>PM-010</td>
                      <td>123567891-PM</td>
                      <td>	kumar</td>
                      <td>Aug 2022</td>
                      <td>sm -6 nos</td>
                      <td>1</td>
                      <td>vadapalani</td>
                      <td>INR 1400</td>
                      <td>INR 1340</td>
                      <td>INR 150</td>
                      <td>	BA-004</td>
                      <td><Badge color="primary">Shipping</Badge> </td>
                      <td>INR 770.53</td>
                    </tr>
                    <tr>
                      <th><img src={nappycleaning} className="border-radius-50" style={{ borderRadius: '50%', width: '50%', height: '50%' }}></img></th>
                      <td>Nappy Cleaning</td>
                      <td>NC-010</td>
                      <td>123567891-NC</td>
                      <td>Navin</td>
                      <td>Feb 2022</td>
                      <td>- 3 nos</td>
                      <td>1</td>
                      <td>Guindy</td>
                      <td>INR 1800</td>
                      <td>INR 1600</td>
                      <td>INR 250</td>

                      <td>	BA-005 </td>
                      <td><Badge color="primary">Delivered</Badge> </td>
                      <td>INR 770.53</td>
                    </tr>
                  </tbody>
                </table>

                {/* <table className="table">
                  <tbody>
                    <tr>
                      <th ><img src={User3} className="border-radius-50" style={{ borderRadius: '50%', width: '50%', height: '50%' }}></img></th>
                      <td>sapiente: Dolor expedita esse et accusantium distinctio fugit repellendus. - - Refurbished <Link to={""}><Icon name="link"></Icon></Link></td>
                      <td>INR470.53 ×1</td>
                      <td>INR470.53</td>
                    </tr>
                    <tr>
                      <th ><img src={User3} className="border-radius-50" style={{ borderRadius: '50%', width: '50%', height: '50%' }}></img></th>
                      <td>at: Laboriosam aut nesciunt magni labore est aut. - - Used<Link to={""}><Icon name="link"></Icon></Link> </td>
                      <td>INR 300.00	×	1</td>
                      <td>INR 300.00</td>
                    </tr>

                  </tbody>
                </table> */}
              </div>
            </div>


            <div className="row">
              {/* <div className="col-md-7 col-sm-4">
                <Link> <p className="addadminnote" onClick={addadminnote}>Add admin note</p> </Link>
                <Modal isOpen={isOpenadminNote} toggle={addadminnote}>
                  <ModalHeader
                    toggle={addadminnote}
                    close={
                      <button className="close" onClick={addadminnote}>
                        <Icon name="cross" />
                      </button>
                    }
                  >
                    UPDATE
                  </ModalHeader>
                  <ModalBody>
                    <h6>ADMIN NOTE &nbsp;<Icon name="question" id="Admin"></Icon></h6>
                    <Tooltip placement="Top" isOpen={tooltipOpenadmin} target="Admin" toggle={Admintooltipadmin}>
                      Tooltip Content!
                    </Tooltip>
                    <textarea className="form-control form-control-lg" />
                  </ModalBody>
                  <ModalFooter >

                    <Button onClick={addadminnote} color="primary">Update</Button>
                  </ModalFooter>
                </Modal>
              </div> */}
              <div className="col-md-6 col-sm-3 d-flex align-items-end justify-content-start">
                <div className="ml-3 mb-3">
                  {/* <Button size="sm" className="btn-dim" color="dark">INVOICE &nbsp;<Icon name="arrow-to-down"></Icon></Button> */}
                </div>
              </div>

              <div className="col-md-6 col-sm-9 mt-2">
                <table className="table  table-responsive d-flex justify-content-end ">
                  <thead>
                    <tr>

                    </tr>
                  </thead>
                  <tbody className="text-right">
                    <tr >
                      <th >
                        <span>Sub Total</span>	</th>
                      <td><span className="ml-2">INR 2967.53</span></td>
                    </tr>
                    <tr >
                      <th >
                        <span>Discount	</span>	</th>
                      <td><span>INR 0.00</span></td>
                    </tr>
                    <tr >
                      <th >
                        <span>Shipping</span>	<br></br>
                      </th>
                      <td><span>INR 5.00</span></td>
                    </tr>
                    <tr >
                      <th >
                        <span>Packaging</span>

                      </th>
                      <td><span>INR 0.00</span></td>
                    </tr>
                    <tr >
                      <th >
                        <span>Handling</span>

                      </th>
                      <td><span>INR 2.00</span></td>
                    </tr>
                    <tr >
                      <th >
                        <span>Taxes</span>	<br></br>
                        <small>Domestic 0%</small>
                        <br />
                        <small>GST 0%</small>
                      </th>
                      <td><span>INR 0.00</span></td>
                    </tr>
                    <tr>
                      <th>
                        <p>Order total</p>
                      </th>
                      <td>
                        <p>INR 2974.53</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </Card>

      </div>
    </div>
  );
};
export default CancelStatus2;
