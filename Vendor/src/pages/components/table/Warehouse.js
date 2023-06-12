import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import "./Profile.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { Block, Icon, Button, Row, Col } from "../../../components/Component";
import { Card, CardText, CardBody, Label, FormGroup, Form, Modal, ModalHeader, ModalBody } from "reactstrap";

import { useCookies } from "react-cookie";
import "./Profile.css";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
// import { API_URL } from "../../../utils/Api"
import { API_Warehouse, token } from "../../../Api";

const API_Key = `${API_Warehouse}`;

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};
const Statelist = [
  {
    key: "AN",
    name: "Andaman and Nicobar Islands",
  },
  {
    key: "AP",
    name: "Andhra Pradesh",
  },
  {
    key: "AR",
    name: "Arunachal Pradesh",
  },
  {
    key: "AS",
    name: "Assam",
  },
  {
    key: "BR",
    name: "Bihar",
  },
  {
    key: "CG",
    name: "Chandigarh",
  },
  {
    key: "CH",
    name: "Chhattisgarh",
  },
  {
    key: "DH",
    name: "Dadra and Nagar Haveli",
  },
  {
    key: "DD",
    name: "Daman and Diu",
  },
  {
    key: "DL",
    name: "Delhi",
  },
  {
    key: "GA",
    name: "Goa",
  },
  {
    key: "GJ",
    name: "Gujarat",
  },
  {
    key: "HR",
    name: "Haryana",
  },
  {
    key: "HP",
    name: "Himachal Pradesh",
  },
  {
    key: "JK",
    name: "Jammu and Kashmir",
  },
  {
    key: "JH",
    name: "Jharkhand",
  },
  {
    key: "KA",
    name: "Karnataka",
  },
  {
    key: "KL",
    name: "Kerala",
  },
  {
    key: "LD",
    name: "Lakshadweep",
  },
  {
    key: "MP",
    name: "Madhya Pradesh",
  },
  {
    key: "MH",
    name: "Maharashtra",
  },
  {
    key: "MN",
    name: "Manipur",
  },
  {
    key: "ML",
    name: "Meghalaya",
  },
  {
    key: "MZ",
    name: "Mizoram",
  },
  {
    key: "NL",
    name: "Nagaland",
  },
  {
    key: "OR",
    name: "Odisha",
  },
  {
    key: "PY",
    name: "Puducherry",
  },
  {
    key: "PB",
    name: "Punjab",
  },
  {
    key: "RJ",
    name: "Rajasthan",
  },
  {
    key: "SK",
    name: "Sikkim",
  },
  {
    key: "TN",
    name: "Tamil Nadu",
  },
  {
    key: "TS",
    name: "Telangana",
  },
  {
    key: "TR",
    name: "Tripura",
  },
  {
    key: "UK",
    name: "Uttar Pradesh",
  },
  {
    key: "UP",
    name: "Uttarakhand",
  },
  {
    key: "WB",
    name: "West Bengal",
  },
];

const Warehouse = ({ alter, id }) => {
  // const [sm, updateSm] = useState(fapincodeDeliverylse);
  const [warehouse, setwarehouse] = useState(false);
  const [cookies] = useCookies();
  const [show, setShow] = useState(false);
  const [emailid, setemailid] = useState(false);
  const [pincodeDelivery, setPincodeDelivery] = useState([]);
  const [mobile, setmobile] = useState(false);
  const mobileNumber = () => {
    setmobile(!mobile);
  };
  const { errors, register, handleSubmit } = useForm();
  // const { errors, register } = useForm();
  const [IDS, setIDS] = useState();
  const [deleteid] = useState();
  const [token, settoken] = useState();
  const [data, setdata] = useState([]);
  const [Warehouses, setWarehouses] = useState({
    warehouse_name: "",
    mobile: "",
    alternate_mobile: "",
    contact_person_name: "",
    State: "",
    city: "",
    address_line_one: "",
    address_line_two: "",
    pincode: "",
    Pincodedelivery: "",
    coordinates: "",
    email_address: "",
    is_default_address: "",
  });

  const [checkedOne, setCheckedOne] = useState(0);
  const updateOne = () => {
    setCheckedOne((prev) => !prev);
  };
 
  const onchange = ({ target: { name, value } }) => {
    setWarehouses({ ...Warehouses, [name]: value });
  };

  useEffect(() => {
    const TokenAccess = JSON.stringify(localStorage.getItem("accessToken"));
    settoken(TokenAccess._id);
    Getdata();
  }, []);

  const Getdata = async () => {
    const data = await axios.get(`${API_Key}/${cookies.vendor_id}`, config);

    setdata(data.data.list);
  };
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
  // const Warehouse = async (id) => {
  //   if (id) {
  //     setIDS(id)
  //     const datas = await axios.get(`${API_Key}/${id}`)
  //     setWarehouses({
  //       warehouse_name: datas.data.warehouse_name,
  //       mobile: datas.data.mobile,
  //       alternate_mobile: datas.data.alternate_mobile,
  //       contact_person_name: datas.data.contact_person_name,
  //       State: datas.data.State,
  //       city: datas.data.city,
  //       address_line_one: datas.data.address_line_one,
  //       address_line_two: datas.data.address_line_two,
  //       pincode: datas.data.pincode,
  //       coordinates: datas.data.coordinates,
  //       email_address: datas.data.email_address,
  //     })
  //     setwarehouse(true)
  //   }
  // };

  // const EmailId = (id) => {
   //   setdeleteid(id)
  //   setemailid(true)
  // };
  const vendarId = cookies.vendor_id;

  const DeleteWarehouse = async () => {
    if (deleteid) {
      const data = await axios.delete(`${API_Key}/delete/${deleteid}`);
      if (data) {
        Getdata();
        setemailid(false);
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

  const Create = async () => {
    const datass = {
      warehouse_name: Warehouses.warehouse_name,
      mobile: Warehouses.mobile,
      alternate_mobile: Warehouses.alternate_mobile,
      contact_person_name: Warehouses.contact_person_name,
      // State: Warehouses.State,
      address_line_two: Warehouses.address_line_two,
      city: Warehouses.city,
      pincode_delivery: JSON.stringify(pincodeDelivery),
      address_line_one: Warehouses.address_line_one,
      pincode: Warehouses.pincode,
      coordinates: Warehouses.coordinates,
      email_address: Warehouses.email_address,
      // is_default_address: Warehouses.is_default_address,
      is_default_address: checkedOne == true ? 1 : 0,
      vendor_id: vendarId,
    };

    axios.post(API_Key, datass, config).then((res) => {
      Getdata(cookies.vendor_id);
      setWarehouses({
        warehouse_name: "",
        mobile: "",
        alternate_mobile: "",
        contact_person_name: "",
        State: "",
        address_line_two: "",
        city: "",
        address_line_one: "",
        pincode: "",
        coordinates: "",
        is_default_address: "",
        email_address: "",
      });
      setPincodeDelivery([]);
      setwarehouse(false);
    });
  };
  const Edit = async (IDS) => {
    const datass = {
      warehouse_name: Warehouses.warehouse_name,
      mobile: Warehouses.mobile,
      alternate_mobile: Warehouses.alternate_mobile,
      contact_person_name: Warehouses.contact_person_name,
      State: Warehouses.State,
      city: Warehouses.city,
      address_line_one: Warehouses.address_line_one,
      pincode: Warehouses.pincode,
      coordinates: Warehouses.coordinates,
      email_address: Warehouses.email_address,
      // is_default_address: Warehouses.is_default_address,
      is_default_address: checkedOne == true ? 1 : 0,
      vendor_id: token,
    };

    axios.put(`${API_Key}/${IDS}`, datass).then((res) => {
      Getdata();
      setemailid(false);
      setmobile(false);
      setIDS("");
      setWarehouses({
        warehouse_name: "",
        mobile: "",
        alternate_mobile: "",
        contact_person_name: "",
        State: "",
        city: "",
        address_line_one: "",
        pincode: "",
        coordinates: "",
        email_address: "",
        is_default_address: "",
      });
    });
  };

  // const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  // // handles ondrop function of dropzone
  // const handleDropChange = (acceptedFiles, set) => {
  //   set(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };

  // const handleDropChange1 = (acceptedFiles, set) => {
  //   set(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };

  // const handleDropChangeGST = (acceptedFiles, set) => {
  //   set(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   );
  // };

  // const handleDropChangeFood = (acceptedFiles, set) => {
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
            {data?.length > 0 ? (
              <>
                {data?.map((items) => {
                  return (
                    <>
                      <Col md={6}>
                        <Card className="card-bordered mt-3">
                          <CardBody className="card-inner" style={{ backgroundColor: "rgb(255, 240, 240)" }}>
                            <div className="position-relative">
                              {/* {items.is_default_address === 1 ?
                            <div class="card-checkmark popup"></div> : null} */}
                            </div>{" "}
                            <div className="row">
                              <div className="col-md-6 text-right">
                                {/* <Button color="primary" size={sm} className="p-1" onClick={() => Warehouse(items._id)}><Icon name="pen"></Icon></Button>&nbsp; */}
                                {/* <Button color="danger" size={sm} className="p-1" onClick={() => EmailId(items._id)}><Icon name="trash"></Icon></Button> */}
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
              <>
                <div className="col-md-12">
                  <p className="text-center">No warehouse details found</p>
                </div>
              </>
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
                  warehouse_name: "",
                  mobile: "",
                  alternate_mobile: "",
                  contact_person_name: "",
                  State: "",
                  city: "",
                  address_line_one: "",
                  pincode: "",
                  coordinates: "",
                  email_address: "",
                  is_default_address: "",
                });
                setPincodeDelivery([])
              }}
            >
              <Icon name="cross" />
            </button>
          }
        >
          Add Warehouse Details
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
                      name="warehouse_name"
                      value={Warehouses.warehouse_name}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Warehouse Name"
                      required
                    />
                    {errors.warehouse_name && <span className="invalid">This field is required</span>}
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
                 
                      type="number"
                      id="fv-email"
                      name="mobile"
                      value={Warehouses.mobile}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      required
                      maxLength={10}
                      ref={register({ required: true })}
                      minLength={10}
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
                    Alternative Mobile Number*
                  </Label>
                  <div className="form-control-wrap">
                    <input
              
                      type="number"
                      id="fv-subject"
                      name="alternate_mobile"
                      value={Warehouses.alternate_mobile}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Alternative Mobile Number"
                      required
                      maxLength={10}
                      ref={register({ required: true })}
                      minLength={10}
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
                      name="address_line_one"
                      value={Warehouses.address_line_one}
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
                      name="address_line_two"
                      value={Warehouses.address_line_two}
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
                        onChange={onchange}
                        placeholder="Select a state"
                      >
                        <option label="Select State" value=""></option>
                        {Statelist.map((items) => {
                          return <option value={items.name}>{items.name}</option>;
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
                      name="city"
                      value={Warehouses.city}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter City"
                      required
                    />
                    {errors.warehouse_name && <span className="invalid">This field is required</span>}
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
                      type="number"
                      id="fv-full-name"
                      name="pincode"
                      value={Warehouses.pincode}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Pincode"
                      required
                    />
                    {errors.warehouse_name && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
            
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-subject">
                    Latitude & Longitude*
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="coordinates"
                      value={Warehouses.coordinates}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Latitude & Longitude"
                      required
                    />
                    {errors.warehouse_name && <span className="invalid">This field is required</span>}
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
            

              <Col size="12">
                <Button
                  color="primary"
                  type="button"
                  size="md"
                  style={{ float: "right", marginLeft: "10px" }}
                  onClick={() => {
                    setwarehouse(false);
                    setWarehouses({
                      warehouse_name: "",
                      mobile: "",
                      alternate_mobile: "",
                      contact_person_name: "",
                      State: "",
                      city: "",
                      address_line_one: "",
                      pincode: "",
                      coordinates: "",
                      email_address: "",
                      is_default_address: "",
                    });
                    setPincodeDelivery([])
                  }}
                >
                  <span>CANCEL</span>
                </Button>
                <Button color="primary" size="md" type="submit" style={{ float: "right", marginLeft: "10px" }}>
                  <span>SAVE</span>
                </Button>
              </Col>
             
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
                <div className="mt-2 mb-2">
                  <p>You won't be able to revert this!?</p>
                </div>
                <Row>
                  <Col md="6" className="text-right">
                    <FormGroup>
                      <Button color="primary" size="sm" onClick={DeleteWarehouse}>
                        Yes, delete it!
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-left">
                    <FormGroup>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => {
                          setemailid(false);
                        }}
                      >
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
      <Modal isOpen={mobile} toggle={mobileNumber}>
        <ModalHeader
          toggle={mobileNumber}
          close={
            <button className="close" onClick={mobileNumber}>
              <Icon name="cross" />
            </button>
          }
        >
          Enter Your New mobile Number
        </ModalHeader>
        <ModalBody>
          <Form className={formClass}>
            <FormGroup>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="warehouse_name"
                  className="form-control"
                />
                {errors.warehouse_name && <span className="invalid">This field is required</span>}
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
