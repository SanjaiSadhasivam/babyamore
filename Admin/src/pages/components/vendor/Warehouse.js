import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { useCookies } from "react-cookie";
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
import {
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Badge,
  Label,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { API_URL, token } from "../../../Api";
import { isWidthUp } from "@material-ui/core";

const API_Key = `${API_URL}/WareshouseVendor`;
const API_WareHouse = `${API_URL}/admin/warehouse`;

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
const Statelist = [
  {
    key: "AN",
    name: "Andaman and Nicobar Islands",
    id: 1,
  },
  {
    key: "AP",
    name: "Andhra Pradesh",
    id: 2,
  },
  {
    key: "AR",
    name: "Arunachal Pradesh",
    id: 3,
  },
  {
    key: "AS",
    name: "Assam",
    id: 4,
  },
  {
    key: "BR",
    name: "Bihar",
    id: 5,
  },
  {
    key: "CG",
    name: "Chandigarh",
    id: 6,
  },
  {
    key: "CH",
    name: "Chhattisgarh",
    id: 7,
  },
  {
    key: "DH",
    name: "Dadra and Nagar Haveli",
    id: 8,
  },
  {
    key: "DD",
    name: "Daman and Diu",
    id: 9,
  },
  {
    key: "DL",
    name: "Delhi",
    id: 10,
  },
  {
    key: "GA",
    name: "Goa",
    id: 11,
  },
  {
    key: "GJ",
    name: "Gujarat",
    id: 12,
  },
  {
    key: "HR",
    name: "Haryana",
    id: 13,
  },
  {
    key: "HP",
    name: "Himachal Pradesh",
    id: 14,
  },
  {
    key: "JK",
    name: "Jammu and Kashmir",
    id: 15,
  },
  {
    key: "JH",
    name: "Jharkhand",
    id: 16,
  },
  {
    key: "KA",
    name: "Karnataka",
    id: 17,
  },
  {
    key: "KL",
    name: "Kerala",
    id: 18,
  },
  {
    key: "LD",
    name: "Lakshadweep",
    id: 19,
  },
  {
    key: "MP",
    name: "Madhya Pradesh",
    id: 20,
  },
  {
    key: "MH",
    name: "Maharashtra",
    id: 21,
  },
  {
    key: "MN",
    name: "Manipur",
    id: 22,
  },
  {
    key: "ML",
    name: "Meghalaya",
    id: 23,
  },
  {
    key: "MZ",
    name: "Mizoram",
    id: 24,
  },
  {
    key: "NL",
    name: "Nagaland",
    id: 25,
  },
  {
    key: "OR",
    name: "Odisha",
    id: 26,
  },
  {
    key: "PY",
    name: "Puducherry",
    id: 27,
  },
  {
    key: "PB",
    name: "Punjab",
    id: 28,
  },
  {
    key: "RJ",
    name: "Rajasthan",
    id: 29,
  },
  {
    key: "SK",
    name: "Sikkim",
    id: 30,
  },
  {
    key: "TN",
    name: "Tamil Nadu",
    id: 31,
  },
  {
    key: "TS",
    name: "Telangana",
    id: 32,
  },
  {
    key: "TR",
    name: "Tripura",
    id: 33,
  },
  {
    key: "UK",
    name: "Uttar Pradesh",
    id: 34,
  },
  {
    key: "UP",
    name: "Uttarakhand",
    id: 35,
  },
  {
    key: "WB",
    name: "West Bengal",
    id: 36,
  },
];

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Warehouse = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [warehouse, setwarehouse] = useState(false);
  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [emailid, setemailid] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [show, setShow] = useState(false);
  const MobileNumber = () => {
    setmobile(!mobile);
  };
  const [isChecked2, setIsChecked2] = useState(0);

  const { errors, register } = useForm();
  const [IDS, setIDS] = useState();
  const [deleteid, setdeleteid] = useState();
  const [tokens, settoken] = useState();
  const [data, setdata] = useState([]);
  const [pincodeDelivery, setPincodeDelivery] = useState([]);
  const [Warehouses, setWarehouses] = useState({
    FullName: "",
    contact_person_name:"",
    Mobile: "",
    AlternativeMobile: "",
    ReadMe: "",
    State: "",
    City: "",
    Address1: "",
    Address2: "",
    Pincode: "",
    Pincodedelivery: "",
    Latlong: "",
    DefaultAddress: "",
  });

  const showInput = () => {
    setShow(true);
    if (Warehouses.Pincodedelivery?.length > 0) {
      let a = { pincodeDelivery: Warehouses.Pincodedelivery };
      setPincodeDelivery([...pincodeDelivery, a]);
      setWarehouses({
        ...Warehouses,
        Pincodedelivery: "",
      });
    }
  };
  const onchange = ({ target: { name, value } }) => {
    setWarehouses({ ...Warehouses, [name]: value });
  };

  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    WarehouseData(ids);
    if (ids) {
      settoken(ids);
      Getdata();
    }
  }, []);

  //WareHouse Details
  const WarehouseData = async (id) => {
    try {
      const Result = await axios.get(`${API_WareHouse}/${id}`, config);
      setWarehouseDetails(Result.data.list);
    } catch (error) {
      let msg = error.response.data.msg;
      if (msg == "No data found") {
        setWarehouseDetails([]);
      }
    }
  };

  const Getdata = async () => {
    const data = await axios.get(`${API_WareHouse}/list`);
    setdata(data.data);
  };

  const EditGetData = async (data) => {
    if (data) {
      console.log(data,"datdasa")
      setwarehouse(!warehouse);
      setIDS(data.warehouse_id);
      // Getdata();
      setWarehouses({
        FullName: data.warehouse_name,
        contact_person_name: data.contact_person_name,
        Mobile: data.mobile,
        AlternativeMobile: data.alternate_mobile,
        // ReadMe: data.data.ReadMe,
        State: data.business_state_id,
        City: data.city,
        Address1: data.address_line_one,
        Address2: data.address_line_two,
        Pincode: data.pincode,
        Latlong: data.coordinates,
        DefaultAddress: data.is_default_address,
      });
      setIsChecked2(data.is_default_address === 0 ? false : true);
    }
  };

  const EmailId = (id) => {
    setdeleteid(id);
    setemailid(true);
  };

  const DeleteWarehouse = async () => {
    if (deleteid) {
      console.log(deleteid, "deleteid");
      const data = await axios.put(`${API_WareHouse}/delete/${deleteid}`, { Status: 0 }, config);
      if (data) {
        WarehouseData(vendarId);
        setemailid(false);
      } else {
        WarehouseData(vendarId);
      }
    }
  };

  const handlesubmitWarehouse = (e) => {
    e.preventDefault();
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  };
  const vendarId = localStorage.getItem("MerchantView");

  const Create = async () => {
    // let formData = new FormData();
    // formData.append("warehouse_name", Warehouses.FullName);
    // formData.append("mobile", Warehouses.Mobile);
    // formData.append("alternate_mobile", Warehouses.AlternativeMobile);
    // // formData.append("ReadMe", Warehouses.ReadMe);
    // formData.append("State", Warehouses.State);
    // formData.append("city", Warehouses.City);
    // formData.append("address_line_one", Warehouses.Address1);
    // formData.append("address_line_two", Warehouses.Address2);
    // formData.append("pincode", Warehouses.Pincode);
    // formData.append("pincode_delivery", pincode);
    // formData.append("coordinates", Warehouses.Latlong);
    // formData.append("is_default_address", isChecked2);
    // formData.append("vendor_id", vendarId);
    // console.log(formData, "formdata");
    // console.log(Warehouses, "formdata");

    let local = {
      warehouse_name: Warehouses.FullName,
      contact_person_name: Warehouses.contact_person_name,
      mobile: Warehouses.Mobile,
      alternate_mobile: Warehouses.AlternativeMobile,
      State: Warehouses.State,
      city: Warehouses.City,
      address_line_one: Warehouses.Address1,
      address_line_two: Warehouses.Address2,
      pincode: Warehouses.Pincode,
      pincode_delivery: JSON.stringify(pincodeDelivery),
      coordinates: Warehouses.Latlong,
      is_default_address: isChecked2,
      vendor_id: vendarId,
    };

    const result = await axios.post(API_WareHouse, local, config);
    if (result) {
      WarehouseData(vendarId);
      setIsChecked2(0);
      setWarehouses({
        FullName: "",
        Mobile: "",
        AlternativeMobile: "",
        ReadMe: "",
        State: "",
        City: "",
        Address1: "",
        Address2: "",
        Pincode: "",
        Latlong: "",
        // DefaultAddress: "",
      });
      setPincodeDelivery([]);
      setwarehouse(false);
    }
  };

  const Edit = async (IDS) => {
    let formData = new FormData();
    formData.append("warehouse_name", Warehouses.FullName);
    formData.append("contact_person_name", Warehouses.contact_person_name);
    formData.append("mobile", Warehouses.Mobile);
    formData.append("alternate_mobile", Warehouses.AlternativeMobile);
    formData.append("ReadMe", Warehouses.ReadMe);
    formData.append("State", Warehouses.State);
    formData.append("city", Warehouses.City);
    formData.append("address_line_one", Warehouses.Address1);
    formData.append("address_line_two", Warehouses.Address2);
    formData.append("pincode", Warehouses.Pincode);
    formData.append("coordinates", Warehouses.Latlong);
    formData.append("is_default_address", isChecked2);
    formData.append("vendor_id", vendarId);

    const Result = await axios.put(`${API_WareHouse}/${IDS}`, formData, config);
    if (Result) {
      Getdata();
      WarehouseData(vendarId);
      setIsChecked2(0);
      setemailid(false);
      setmobile(false);
      setIDS("");
      setWarehouses({
        FullName: "",
        Mobile: "",
        contact_person_name:"",
        AlternativeMobile: "",
        ReadMe: "",
        State: "",
        City: "",
        Address1: "",
        Address2: "",
        Pincode: "",
        Latlong: "",
        Pincodedelivery: "",
        // DefaultAddress: "",
      });
      WarehouseData(vendarId);
      setwarehouse(false);
    }
  };

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

  const handleOnChange2 = (event) => {
    let checkBoxvalue = event.target.checked;
    console.log(checkBoxvalue, "checkBoxvalue");
    if (checkBoxvalue) {
      setIsChecked2(1);
      // setCount(1);
    } else {
      // setCount(0);
      setIsChecked2(0);
    }
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

  const handleDropChangeFood = (acceptedFiles, set) => {
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

        <Block className="container badge-dim">
          <Row>
            <Col md={6}>
              <p className="font-weight-bold">Warehouse Details</p>
            </Col>
            <Col md={6} className="text-right">
              <Button
                color="primary"
                size="md"
                onClick={() => {
                  setwarehouse(true);
                }}
              >
                <Icon name="plus" />
                <span>Add Warehouse</span>
              </Button>
            </Col>
          </Row>
          <hr></hr>

          <Row>
            {warehouseDetails?.length > 0 ? (
              <>
                {warehouseDetails?.map((items) => {
                  return (
                    <>
                      {console.log(items, "items")}
                      <Col md={6}>
                        <Card
                          className={
                            items.is_default_address === 1 ? "card-bordered mt-3 borders" : "card-bordered mt-3"
                          }
                        >
                          <CardBody className="card-inner" style={{ backgroundColor: "rgb(255, 240, 240)" }}>
                            <div className="position-relative">
                              {items.is_default_address === 1 ? <div class="card-checkmark popup"></div> : null}
                            </div>
                            <div className="row">
                              <div className="col-md-6"></div>
                              <div className="col-md-6 text-right">
                                <Button color="primary" size={sm} className="p-1" onClick={() => EditGetData(items)}>
                                  <Icon name="pen"></Icon>
                                </Button>
                                &nbsp;
                                <Button
                                  color="danger"
                                  size={sm}
                                  className="p-1"
                                  onClick={() => EmailId(items.warehouse_id)}
                                >
                                  <Icon name="trash"></Icon>
                                </Button>
                              </div>
                            </div>

                            <CardText className="">
                              <div className="p-3">
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Warehouse Name</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.warehouse_name}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Contact Name</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.contact_person_name}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Email ID</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.email_address}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Address </p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>
                                      {items.address_line_one},{items.address_line_two}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Latitude & Longitude </p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.coordinates}</p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">City & State</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>
                                      {items.city}, {items.State}
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Pincode</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.pincode}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Pincode for Delivery</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    {items.pincode_delivery
                                      ? JSON.parse(items.pincode_delivery)?.map((currEle) => {
                                          return (
                                            <>
                                                <span>{currEle.pincodeDelivery}</span>,
                                            </>
                                          );
                                        })
                                      : null}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Mobile Number </p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.mobile}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Alternative Mobile Number </p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.alternate_mobile}</p>
                                  </div>
                                </div>
                              </div>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </>
            ) : (
              <div className="col-md-12">
                <p className="text-center">No WareHouse Found</p>
              </div>
            )}

          
          </Row>
        </Block>
      </React.Fragment>
      {/* add warehouse */}
      <Modal size="lg" isOpen={warehouse}>
        <ModalHeader
          close={
            <button
              className="close"
              onClick={() => {
                setwarehouse(false);
                setWarehouses({
                  FullName: "",
                  Mobile: "",
                  contact_person_name:"",
                  AlternativeMobile: "",
                  ReadMe: "",
                  State: "",
                  City: "",
                  Address1: "",
                  Address2: "",
                  Pincode: "",
                  Pincodedelivery: " ",
                  DefaultAddress: "",
                });
              }}
            >
              <Icon name="cross" />
            </button>
          }
        >
          {/* Add Warehouse Details */}
          {IDS ? "Edit Warehouse Details" : " Add Warehouse Details"}
        </ModalHeader>
        <ModalBody>
          <Form className={formClass} onSubmit={handlesubmitWarehouse}>
            <Row className="g-gs">
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Warehouse Name*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="FullName"
                      value={Warehouses.FullName}
                      placeholder="Enter Warehouse Name"
                      onChange={onchange}
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Contact Person Name*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="contact_person_name"
                      value={Warehouses.contact_person_name}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Contact Person Name"
                      required
                    />
                    {errors.contact_person_name && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Mobile Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                     type="text"
                     ref={register({ required: true })}
                      id="fv-email"
                      name="Mobile"
                      value={Warehouses.Mobile}
                      placeholder="Enter Mobile Number"
                      onChange={onchange}
                      className="form-control"
                      maxLength={10}
                              minLength={10}
                      required
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="invalid">{errors.email.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Alternative Mobile Number
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-subject"
                      name="AlternativeMobile"
                      value={Warehouses.AlternativeMobile}
                      placeholder="Enter Alternative Mobile"
                      onChange={onchange}
                      className="form-control"
                      maxLength={10}
                              minLength={10}
                      required
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="invalid">{errors.email.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-email">
                    Address Line 1*
                  </Label>
                  <div className="form-control-wrap">
                    <textarea
                      type="text"
                      id="fv-email"
                      name="Address1"
                      value={Warehouses.Address1}
                      onChange={onchange}
                      className="form-control no-resize"
                      style={{ minHeight: "30px" }}
                      placeholder="Address (House No / Flat No, Building Name, Area and Street)"
                      required
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="invalid">{errors.email.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-email">
                    Address Line 2*
                  </Label>
                  <div className="form-control-wrap">
                    <textarea
                      type="text"
                      id="fv-email"
                      name="Address2"
                      value={Warehouses.Address2}
                      onChange={onchange}
                      className="form-control no-resize"
                      style={{ minHeight: "30px" }}
                      placeholder="Enter Address Line 2"
                      required
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="invalid">This is required</span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className="invalid">{errors.email.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>

              <Col md="6" className="pt-1 mt-0">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-email">
                    Select State*
                  </Label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <select
                        className="form-control form-select"
                        id="fv-topics"
                        name="State"
                        value={Warehouses.State}
                        onChange={onchange}
                        placeholder="Select a state"
                        required
                      >
                        <option label="Select a state" value=""></option>
                        {Statelist.map((items) => {
                          return <option value={items.id}>{items.name}</option>;
                        })}
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
                      name="City"
                      value={Warehouses.City}
                      onChange={onchange}
                      placeholder="Enter City"
                      className="form-control"
                      required
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
                      name="Pincode"
                      value={Warehouses.Pincode}
                      onChange={onchange}
                      placeholder="Enter Pincode"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Latitude & Longitude
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="Latlong"
                      value={Warehouses.Latlong}
                      onChange={onchange}
                      placeholder="Enter Latitude & Longitude"
                      className="form-control"
                      required
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Pincode For Delivery
                  </Label>
                  <div className="form-control-wrap">
                    {show ? (
                      <>
                        {" "}
                        <input
                          ref={register({ required: true })}
                          type="text"
                          id="fv-full-name"
                          name="Pincodedelivery"
                          value={Warehouses.Pincodedelivery}
                          onChange={onchange}
                          placeholder="Enter Pincode For Delivery"
                          className="form-control"
                          // required
                        />
                        {errors.fullname && <span className="invalid">This field is required</span>}
                        <div>
                          {pincodeDelivery?.length > 0 ? (
                            <>
                              {pincodeDelivery.map((currEle) => {
                                return (
                                  <>
                                    {" "}
                                    <span className="mx-2">{currEle.pincodeDelivery}</span>{" "}
                                  </>
                                );
                              })}
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                    <Button color="primary" type="button" className={"mt-3"} onClick={showInput}>
                      Add Pincode
                    </Button>
                  </div>
                </FormGroup>
              </Col>

              {/* <Col md="12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    name="DefaultAddress"
                    value={isChecked2}
                    defaultChecked={isChecked2}
                    onChange={(e) => handleOnChange2(e)}
                    id="customCheckaddresss"
                  />

                  <label className="custom-control-label" htmlFor="customCheckaddresss">
                    Mark As Default Address 
                  </label>
                </div>
              </Col> */}

              <Col size="12" className="text-right ">
                <Button color="primary" type="submit" className="mx-2">
                  {" "}
                  <span>{IDS ? "UPDATE" : " SAVE"}</span>{" "}
                </Button>
                <Button color="primary" type="submit" onClick={() => setwarehouse(!warehouse)}>
                  {" "}
                  <span>CANCEL</span>{" "}
                </Button>
              </Col>
              {/* <Row className="RightAlign">
                <Col md="6" className="text-left">
                  <FormGroup>
                    <Button color="primary" type="submit">
                      {IDS ? "UPDATE" : " SAVE"}
                    </Button>
                  </FormGroup>
                </Col>
                <Col md="6" className="text-right">
                  <FormGroup>
                    <Button color="primary" type="button" onClick={() => setwarehouse(!warehouse)}>
                      CANCEL
                    </Button>
                  </FormGroup>
                </Col>
              </Row> */}
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      {/* emilid */}
      <Modal
        isOpen={emailid}
        toggle={() => {
          setemailid(true);
        }}
      >
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div>
                  <Icon name="alert-circle" color="primary" style={{ fontSize: "60px" }}></Icon>
                </div>
                <div className="mt-2">
                  <h6>Are you sure?</h6>
                </div>
                <br />
                <br />

                <Row>
                  <Col md="6" className="text-right">
                    <FormGroup>
                      <Button color="primary" type="button" size="md" onClick={() => DeleteWarehouse()}>
                        Delete
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-left">
                    <FormGroup>
                      <Button
                        type="button"
                        color="primary"
                        size="md"
                        onClick={() => {
                          setemailid(false);
                        }}
                      >
                        Cancel
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
          <Form className={formClass}>
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
export default Warehouse;
