import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
import { useCookies } from "react-cookie";
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
import { RSelect } from "../../../components/Component";
import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { API_URL, API_Get_Poc, API_Vendor_Poc, API_Warehouse, token as auth, API_Vendor } from "../../../Api";

const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${auth} `,
  },
};
const API_Key = `${API_Vendor_Poc}`;

 const OrderPoc = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [Addpoc, setAddpoc] = useState(false);
  const [warehouse, setwarehouse] = useState([]);
  const [WareHouseList, setWareHouseList] = useState([]);
  const ADDPOC = () => {
    setAddpoc(!Addpoc);
    setwarehouse([])
    // setWareHouseList([]);
  };
  const [emailid, setemailid] = useState(false);
  const [count, setCount] = useState(0);

  const [mobile, setmobile] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { errors, register } = useForm();
  const [token, settoken] = useState();
  const [IDS, setIDS] = useState();
  const [data, setdata] = useState([]);
  const [Order, setOrder] = useState({
    poc_name: "",
    poc_designation: "",
    poc_email_address: "",
    poc_phone_no: "",
    poc_like_rec_com: "",
    poc_mark_default: "",
  });
  const [ischecked, setchecked] = useState();
   // const onChangeValue = (event) => {
   //   setchecked(event.target.value);
   // }
  const [isReceive, setIsReceive] = useState(1);

  function onChangeValue(event) {
    setIsReceive(event.target.value);
   }

  const [checkedOne, setCheckedOne] = useState(0);
  const updateOne = () => {
    setCheckedOne((prev) => !prev);
  };
   const onchange = ({ target: { name, value } }) => {
    setOrder({ ...Order, [name]: value });
   };
  const handleOnChange2 = (event) => {
    if (event.target.checked == true) {
      setIsChecked2(event.target.checked);
      setCount(1);
     } else if (event.target.checked == false) {
      setCount(0);
      setIsChecked2(false);
     }
  };
  const onFormSubmit = (e) => {};
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });


  const getware = async (id) => {
     setWareHouseList([]);
    const ware = await axios.get(`${API_Warehouse}/${cookies.vendor_id}`, {
      headers: { Authorization: `Bearer ${auth} ` },
    });
     if (ware.data) {
      ware.data.list.map((items) => {
        const datas = {
          value: items.warehouse_id,
          label: items.warehouse_name,
        };
        setWareHouseList((items) => [...items, datas]);
      });
    }
  };
  useEffect(() => {
    const TokenAccess = JSON.stringify(localStorage.getItem("accessToken"));
    settoken(TokenAccess._id);
    Getdata();
    getware(vendarId);
  }, []);
  const vendarId = cookies.vendor_id;

  const EmailId = async (id) => {
    if (id) {
      setIDS(id);
      const datas = await axios.get(`${API_Key}/${id}`);

      setOrder({
        ...Order,
        poc_email_address: datas.data.poc_email_address,
        poc_name: datas.data.poc_name,
        poc_designation: datas.data.poc_designation,
        poc_phone_no: datas.data.poc_phone_no,
        poc_like_rec_com: datas.data.poc_like_rec_com,
        poc_mark_default: datas.data.poc_mark_default,
      });
      setIsChecked2(datas.data.poc_mark_default == false ? false : true);
      setCount(datas.data.poc_mark_default);
    }
    setemailid(true);
  };

  const MobileNumber = async (id) => {
    if (id) {
      setIDS(id);
      const datas = await axios.get(`${API_Key}/${id}`);

      setOrder({
        ...Order,
        poc_email_address: datas.data.poc_email_address,
        poc_name: datas.data.poc_name,
        poc_designation: datas.data.poc_designation,
        poc_phone_no: datas.data.poc_phone_no,
        poc_like_rec_com: datas.data.poc_like_rec_com,
        poc_mark_default: datas.data.poc_mark_default,
      });
    }

    setmobile(true);
  };

  const Getdata = async () => {
    const data = await axios.get(`${API_Get_Poc}/${cookies.vendor_id}`, config);
    setdata(data.data.list);
  };
 
  const handlesubmitOrder = (e) => {
    e.preventDefault();
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  };

  const Create = async () => {
    const datass = {
      poc_name: Order.poc_name,
      poc_designation: Order.poc_designation,
      poc_email_address: Order.poc_email_address,
      poc_phone_no: Order.poc_phone_no,
      poc_like_rec_com: isReceive == "0" ? 0 : 1,
      poc_mark_default: checkedOne == true ? 1 : 0,
      vendor_id: vendarId,
    };

    axios.post(API_Key, datass, config).then((res) => {
      setOrder({
        // LabelName: "",
        poc_name: "",
        poc_designation: "",
        poc_email_address: "",
        poc_phone_no: "",
        poc_like_rec_com: "",
        poc_mark_default: "",
      });
      setCheckedOne(0);
      ADDPOC();
      setIsChecked2(false);
      setCount(0);
      Getdata();
    });
  };
  const Edit = async (IDS) => {
    const datass = {
      poc_name: Order.poc_name,
      poc_designation: Order.poc_designation,
      poc_email_address: Order.poc_email_address,
      poc_phone_no: Order.poc_phone_no,
      poc_like_rec_com: isReceive == "0" ? 0 : 1,
      poc_mark_default: checkedOne == true ? 1 : 0,
      vendor_id: vendarId,
    };

    axios.put(`${API_Key}/${IDS}`, datass).then((res) => {
      Getdata();
      setemailid(false);
      setmobile(false);
      setIDS("");
      setOrder({
        poc_name: "",
        poc_designation: "",
        poc_email_address: "",
        poc_phone_no: "",
        poc_like_rec_com: "",
        poc_mark_default: "",
      });
      setIsChecked2(false);
    });
  };

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

        <Block className="container">
          <Row>
            <Col md={6}>
              <p className="font-weight-bold">Order POC Details</p>
            </Col>
            <Col md={6} className="text-right">
              <Button color="primary" size="md" onClick={ADDPOC}>
                <Icon name="plus" />
                <span>Add POC</span>
              </Button>
            </Col>
          </Row>
          <hr></hr>
          {/* <Form className={formClass}  >
            <Row>

              {data.map((items) => {
                return (
                  <Col md={12}>
                    <Card className="card-bordered" key={items._id}>
                      <CardBody className="card-inner">


                        <CardText>
                          <div className="row">
                            <div className="col-md-2">
                              <p className="font-weight-bold">Designation </p>
                            </div>
                            <div className="col-md-1">
                              <p>: </p>
                            </div>
                            <div className="col-md-2">
                              <p>{items.poc_designation} </p>
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
                              <p>{items.poc_email_address}
                               
                               </p>
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
                              <p>{items.poc_phone_no}
                              </p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <p className="font-weight-bold"> Would you like to receive communication on order*
                              </p>
                            </div>


                            <div className="col-md-6">
                              <p>{items.poc_like_rec_com === 1 ? 'YES' : 'NO'}  </p>
                            </div>
                          </div>
                        </CardText>

                      </CardBody>
                    </Card>
                    <br></br>
                  </Col>

                )

              })}



            </Row>




          </Form> */}
          <Row>
            {data?.length > 0 ? (
              <>
                {data?.map((items) => {
                  return (
                    <>
                      <Col md={6}>
                        <Card
                          className={items.poc_mark_default === 1 ? "card-bordered mt-3 borders" : "card-bordered mt-3"}
                        >
                          <CardBody className="card-inner" style={{ backgroundColor: "rgb(255, 240, 240)" }}>
                            <div className="position-relative">
                              {items.poc_mark_default === 1 ? <div class="card-checkmark popup"></div> : null}
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
                                    <p className="font-weight-bold">Name</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.poc_name}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Designation</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.poc_designation} </p>
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
                                    <p>{items.poc_email_address}</p>
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
                                    <p>{items.poc_phone_no}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Receive Communication On Order</p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.poc_like_rec_com === 0 ? "No" : "Yes"}</p>
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
                  <p className="text-center">No POC details found</p>
                </div>
              </>
            )}
          </Row>
        </Block>
      </React.Fragment>
      {/* add poc */}
      <Modal isOpen={Addpoc} size="lg">
        <ModalHeader
          toggle={ADDPOC}
          close={
            <button className="close" onClick={ADDPOC}>
              <Icon name="cross" />
            </button>
          }
        >
         Add POC Details
        </ModalHeader>
        <ModalBody>
          <Form className={formClass} onSubmit={handlesubmitOrder}>
            <Row className="g-gs">
              {/* <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-full-name">
                    Label Name
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-full-name"
                      name="LabelName"
                      value={Order.LabelName}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Label Name"
                    />
                    {errors.fullname && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col> */}
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-email">
                    Name of the Person
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="fv-email"
                      name="poc_name"
                      value={Order.poc_name}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Name of the Person"
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
                    Designation
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      id="fv-subject"
                      name="poc_designation"
                      value={Order.poc_designation}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Designation"
                      required
                    />
                    {errors.subject && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-email">
                    Email Address
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
                      name="poc_email_address"
                      value={Order.poc_email_address}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Email Address"
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
                    Mobile Number
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: true })}
                      type="number"
                      onmousewheel="return false;"
                      onWheelCapture={(e) => {
                        e.target.blur();
                      }}
                      id="fv-subject"
                      name="poc_phone_no"
                      value={Order.poc_phone_no}
                      onChange={onchange}
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      minLength={10}
                      required
                    />
                    {errors.subject && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Would You Like To Receive Communication On Order *</Label>
                  <ul className="custom-control-group g-3 align-center flex-wrap" onChange={onChangeValue}>
                  <li>
                      <div className="custom-control custom-radio align-items-baseline">

                        <input
                          type="radio"
                          value="1"
                          onChange={(e) => setIsReceive("1")}
                          name="gender"
                          
                          checked={isReceive == "1"}

                        />
                        <label  className="mx-2">
                          YES
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio align-items-baseline">

                        <input
                          type="radio"
                          value="0"
                          onChange={(e) => setIsReceive("0")}
                          name="gender"
                         
                          checked={isReceive == "0"}

                        />
                        <label className="mx-2">
                          NO
                        </label>
                      </div>
                    </li>
                 
                 
                 
                 
                 
                    {/* <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="ischecked"
                          checked={ischecked === true }
                          value={Order.poc_like_rec_com}
                          onChange={onChangeValue}
                          id="esr"
                        />
                        <label className="custom-control-label" htmlFor="esr">
                          Yes
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                         type="radio"
                         className="custom-control-input form-control"
                         name="ischecked"
                         checked={ischecked === true}
                         value={Order.poc_like_rec_com}
                         onChange={onChangeValue}
                         id="tsr"
                        />
                        <label className="custom-control-label" htmlFor="tsr">
                          No
                        </label>
                      </div>
                    </li> */}

                    {/* <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          value="1"
                          id="esr"
                          name="isReceive"
                          className="custom-control-input form-control"
                          checked={isReceive === "1"}
                        />
                        <label className="custom-control-label" htmlFor="esr">
                          Yes
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          value="0"
                          id="tsr"
                          name="isReceive"
                          className="custom-control-input form-control"
                          checked={isReceive === "0"}
                        /> */}
                        {/* <label className="custom-control-label" htmlFor="tsr">
                          No
                        </label>
                      </div>
                    </li> */}
                  </ul>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-message">
                    Select Warehouse
                  </Label>
                  <div className="form-control-wrap">
                    <RSelect
                      name=""
                      onChange={(event) => setwarehouse(event)}
                      options={WareHouseList}
                      isMulti={true}
                      ref={register({ required: "This is required" })}
                      value={warehouse}
                      placeholder="Select"
                    />
                    {errors.message && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>{" "}
              <Col md="12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    name="poc_mark_default"
                    // checked={isChecked2}
                    // onChange={onchange}
                    checked={checkedOne}
                    onChange={updateOne}
                    id="wer"
                  />
                  <label className="custom-control-label" htmlFor="wer">
                    Mark As Default Primary POC
                  </label>
                </div>
              </Col>
              <Col size="12">
                <Button
                  onClick={ADDPOC}
                  size="sm"
                  color="primary"
                  type="button"
                  style={{ float: "right", marginLeft: "10px" }}
                >
                  <span>CANCEL</span>
                </Button>
                <Button color="primary" size="sm" type="submit" style={{ float: "right", marginLeft: "10px" }}>
                  <span>SAVE</span>
                </Button>
              </Col>
              {/* <Col md="6" className="text-left">
                  <FormGroup>
                    <Button color="primary" type="submit" size="sm"  style={{ float: 'right', marginLeft: '10px' }}>
                      Save
                    </Button>
                  </FormGroup>
                </Col>
                <Col md="6" className="text-right">
                  <FormGroup>
                    <Button color="primary" type="button" size="sm">
                      cancel
                    </Button>
                  </FormGroup>
                </Col> */}
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      {/* emilid */}
      <Modal isOpen={emailid}>
        <ModalHeader
          close={
            <button
              className="close"
              onClick={() => {
                setemailid(false);
              }}
            >
              <Icon name="cross" />
            </button>
          }
        >
          Enter Your New Email ID
        </ModalHeader>
        <ModalBody>
          <Form className={formClass}>
            <FormGroup>
              <div className="form-control-wrap">
                <input
                  // ref={register({ required: true })}
                  type="email"
                  id="fv-full-name"
                  name="Email"
                  value={Order.Email}
                  onChange={onchange}
                  className="form-control"
                  required
                />
                {/* {errors.fullname && <span className="invalid">This field is required</span>} */}
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" onClick={handlesubmitOrder}>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/* mobile */}
      <Modal isOpen={mobile}>
        <ModalHeader
          close={
            <button
              className="close"
              onClick={() => {
                setmobile(false);
              }}
            >
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
                  name="Mobile"
                  value={Order.Mobile}
                  onChange={onchange}
                  className="form-control"
                />
                {errors.fullname && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" size="sm" type="submit" onClick={handlesubmitOrder}>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default OrderPoc;
