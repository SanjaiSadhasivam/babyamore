import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
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
  RSelect
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
import { useCookies } from "react-cookie";

import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { API_URL, token } from "../../../Api";

const API_Key = `${API_URL}/OrderPOC`;

const API_POC = `${API_URL}/admin/poc`;

const API_WareHouse = `${API_URL}/admin/warehouse`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const OrderPoc = ({ alter, id }) => {
  const [sm, updateSm] = useState(false);
  const [Addpoc, setAddpoc] = useState(false);
  const [isReceive, setIsReceive] = useState(1);
  const [checkedOne, setCheckedOne] = useState(0);
  const [warehouse, setwarehouse] = useState([]);
  const ADDPOC = () => {
    setAddpoc(!Addpoc);
    setwarehouse([])
    
  };
  const [poctag, setPocTag] = useState(false);
  const [emailid, setemailid] = useState(false);
  const [deleteid, setDeleteId] = useState();
  const [isChecked2, setIsChecked2] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [cookies] = useCookies();
  const { errors, register } = useForm();
  const [token, settoken] = useState();
  const [IDS, setIDS] = useState();
  const [data, setdata] = useState([]);

  const [poc, setPoc] = useState([]);
  const [count, setCount] = useState(0);

  const [warehouseDetails, setWarehouseDetails] = useState([]);
  const [Order, setOrder] = useState({
    LabelName: "",
    Name: "",
    Designation: "",
    Email: "",
    Mobile: "",
    Receive: "",
    DefaultPrimary: "",
  });

 
  // console.log('checkedOne', checkedOne);
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

  const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");

    pocData(ids);
    if (ids) {
      settoken(ids);
      Getdata();
      // warehouseData(ids)
      getware(ids);
    }
  }, []);
  const ids = localStorage.getItem("MerchantView");

  const pocData = async (id) => {
    try {
      const resultdata = await axios.get(`${API_POC}/${id}`, config);
      setPoc(resultdata.data.list);
    } catch (error) {
      let msg = error.response.data.msg;
      if (msg == "No data found") {
        setPoc([]);
      }
    }
  };
  const [WareHouseList, setWareHouseList] = useState([]);

  const getware = async (id) => {
    const ware = await axios.get(`${API_WareHouse}`, config);

    let Result = ware.data.list.filter((currEle) => {
      return currEle.vendor_id == vendarId;
    });

    const Res = Result.map((itemsMain) => {
      const datss = {
        value: itemsMain.warehouse_id,
        label: itemsMain.warehouse_name,
      };
      return datss;
    });
    setWareHouseList(Res);
  };

  // const warehouseData = async (ids)=>{
  //   const resultDatas=await axios.get(`${API_WareHouse}/?vendor_id=${ids}`,config)

  //   setWarehouseDetails(resultDatas)

  // }
  const handleClickAlertOpen = (type, poc_id) => {
    // setView({ details: type === "remove" ? true : false });
    setIDS(poc_id);
  };
  const DeletePoc = async () => {
    if (poc_id) {
      const data = await axios.delete(`${API_POC}/delete/${poc_id}`);
      if (data) {
        pocData();
        setemailid(false);
      }
    }
  };

  const deleteID = (poc_id) => {
    // setIDS(poc_id);
    setemailid(true);
    // pocData();
    setDeleteId(poc_id);
  };

  const handleAlertDelete = async () => {
    if (deleteid) {
      const { data } = await axios.put(`${API_POC}/delete/${deleteid}`, { Status: 0 }, config);
      if (data) {
        pocData(ids);
        setemailid(false);
      } else {
        pocData(ids);
      }
    }

    pocData(vendarId);

    setemailid(false);
  };

  const MobileNumber = async (id) => {
    if (id) {
      setIDS(id.poc_id);
      // const datas = await axios.get(`${API_POC}/${id}`)
      setOrder({
        // ...Order,
        // Email: datas.data.Email,
        // LabelName: datas.data.LabelName,
        // Name: datas.data.LabelName,
        // Designation: datas.data.Designation,
        Mobile: id.poc_phone_no,
        Email: data.poc_email_address,
        // Receive: datas.data.Receive,
        // DefaultPrimary: datas.data.DefaultPrimary,
      });
    }
    setmobile(true);
  };

  const Getdata = async () => {
    const data = await axios.get(`${API_POC}`);
    setdata(data.data);
  };

  const EditGetData = async (id) => {
    if (id) {
      setPocTag(!poctag);
      setIsReceive(id.poc_like_rec_com)
      setIDS(id.poc_id);
      
      setOrder({
        Name: id.poc_name,
        Designation: id.poc_designation,
        Mobile: id.poc_phone_no,
        Email: id.poc_email_address,
        Receive: id.poc_like_rec_com,
        DefaultPrimary: id.poc_mark_default,
      });

      setIsChecked2(id.poc_mark_default == 0 ? false : true);
      setCount(id.poc_mark_default);
    }
    // setemailid(true)
  };
  const handlesubmitOrder = (e) => {
    e.preventDefault();
    if (!IDS) {
      Create();
    } else {
      Edit(IDS);
    }
  };

  const vendarId = localStorage.getItem("MerchantView");

  const Create = async () => {
    let formData = new FormData();
    formData.append("poc_name", Order.Name);
    formData.append("poc_designation", Order.Designation);
    formData.append("poc_email_address", Order.Email);
    formData.append("poc_phone_no", Order.Mobile);
    formData.append("poc_like_rec_com", isReceive == "0" ? 0 : 1);
    formData.append("poc_mark_default", checkedOne == true ? 1 : 0);
    formData.append("vendor_id", vendarId);

    const results = await axios.post(API_POC, formData, config);
    if (results) {
      pocData(vendarId);
      setOrder({
        Name: "",
        Designation: "",
        Email: "",
        Mobile: "",
        isReceive: "",
        checkedOne: "",


        poc_like_rec_com: "",
        poc_mark_default: "",

      });
      ADDPOC()
      Getdata();
      setCount(0);
      setIsChecked2("");
      setPocTag(false);
      setCheckedOne("");
      setIsReceive("")
      setwarehouse([])

    }
  };
  const Edit = async (IDS) => {
    let formData = new FormData();
    formData.append("poc_name", Order.Name);
    formData.append("poc_designation", Order.Designation);
    formData.append("poc_email_address", Order.Email);
    formData.append("poc_phone_no", Order.Mobile);

    formData.append("poc_like_rec_com", isReceive == "0" ? 0 : 1);
    formData.append("poc_mark_default", checkedOne == true ? 1 : 0);
    formData.append("vendor_id", vendarId);
  
    const Result = await axios.put(`${API_POC}/${IDS}`, formData, config);

    if (Result) {
      pocData(vendarId);
      setemailid(false);

      setIDS("");
      setOrder({
        Name: "",
        Designation: "",
        Email: "",
        Mobile: "",
        Receive: "",
        DefaultPrimary: "",
      });
      setPocTag(false);
      setIsChecked2(false);
      setCount(0);
      setwarehouse([])
    }
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
              <Button
                className="toggle d-none d-md-inline-flex"
                color="primary"
                size="md"
                onClick={() => {
                  setPocTag(true);
                }}
              >
                <Icon name="plus" />
                <span>Add POC</span>
              </Button>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            {poc?.length > 0 ? (
              <>
                {poc?.map((items) => {
                
                  return (
                    <>
                      <Col md={6}>
                        <Card
                          className={items.poc_mark_default === 1 ? "card-bordered mt-3 borders" : "card-bordered mt-3"}
                        >
                          <CardBody className="card-inner" style={{ backgroundColor: "rgb(255, 240, 240)" }}>
                            <div className="position-relative">
                              {items.poc_mark_default === 1 ? <div class="card-checkmark popup"></div> : null}
                            </div>
                            <div className="row">
                              <div className="col-md-6"></div>
                              <div className="col-md-6 text-right">
                                <Button color="primary" size={sm} className="p-1" onClick={() => EditGetData(items)}>
                                  <Icon name="pen"></Icon>
                                </Button>
                                &nbsp;
                                <Button color="danger" size={sm} className="p-1" onClick={() => deleteID(items.poc_id)}>
                                  <Icon name="trash"></Icon>
                                </Button>
                              </div>
                            </div>

                            <CardText>
                              <div className="p-3 ">
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Name of the Person </p>
                                  </div>
                                  <div className="col-md-2">
                                    <p>:</p>
                                  </div>
                                  <div className="col-md-5">
                                    <p>{items.poc_name} </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-5">
                                    <p className="font-weight-bold">Designation </p>
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
                                    <p className="font-weight-bold">Email Address </p>
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
              <div className="col-md-12">
                <p className="text-center">No POC details found</p>
              </div>
            )}

            {/* {poc.map((items) => {
    return (
      <Col md={12}>
        <Card className="card-bordered" key={items.poc_id}>
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
                  <p>{items.poc_email_address} <Icon name="pen"  style={{ cursor: 'pointer' }}></Icon> </p>
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
                  <p>{items.poc_phone_no
}<Icon name="pen" onClick={() => MobileNumber(items)} style={{ cursor: 'pointer' }}></Icon> </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="font-weight-bold"> Would you like to receive communication on order*
                  </p>
                </div>


                <div className="col-md-6">
                  <p>{items.poc_like_rec_com ? "YES":"NO"}  </p>
                </div>
              </div>
            </CardText>

          </CardBody>
        </Card>
        <br></br>
      </Col>

    )

  })} */}
          </Row>
        </Block>
      </React.Fragment>
      {/* add poc */}
      <Modal
        size="lg"
        isOpen={poctag}
        toggle={ADDPOC}
      >
        <ModalHeader
          toggle={ADDPOC}
          close={
            <button
              className="close"
              onClick={() => {
                setIDS("");
                setwarehouse([]);
                setPocTag(false);
                setOrder({
                  Name: "",
                  Designation: "",
                  Email: "",
                  Mobile: "",
                  Receive: "",
                  DefaultPrimary: "",
                });
              }}
            >
              <Icon name="cross" />
            </button>
          }
        >
          {/* Add Order POC */}
          {IDS ? "Edit POC Details" : "Add POC Details"}
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
                      name="Name"
                      value={Order.Name}
                      onChange={onchange}
                      placeholder="Enter Name of the Person"
                      className="form-control"
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
                      name="Designation"
                      value={Order.Designation}
                      placeholder="Enter Designation"
                      onChange={onchange}
                      className="form-control"
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
                      name="Email"
                      value={Order.Email}
                      onChange={onchange}
                      placeholder="Enter Email Address"
                      className="form-control"
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
                      type="text"
                      id="fv-subject"
                      name="Mobile"
                      value={Order.Mobile}
                      onChange={onchange}
                      placeholder="Enter Mobile Number"
                      className="form-control"
                      required
                      maxLength={10}
                      minLength={10}
                    />
                    {errors.subject && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>


              <Col md="6">
                <FormGroup>
                  <Label>Would You Like To Receive Communication On Order *</Label>
                  <ul className="custom-control-group g-3 align-items-center d-flex">
                   
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
                  </ul>


                  {/* <ul className="custom-control-group g-3 align-center flex-wrap">
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          value="1"
                          onClick={()=>setIsReceive("1")}
                          name="gender"
                          className="custom-control-input form-control"
                        checked={isReceive=="1"}
                        />
                        <label className="custom-control-label">
                          YES
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          value="0"
                          onClick={()=>setIsReceive("0")}
                          name="gender"
                          className="custom-control-input form-control"
                          checked={isReceive=="0"}
                        />
                        <label className="custom-control-label" >
                          NO
                        </label>
                      </div>
                    </li>
                  </ul> */}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label className="form-label" htmlFor="fv-message">
                    Select Warehouse
                  </Label>
                  <div className="form-control-wrap">
                    <RSelect
                      name="warehouse_id"

                      // options="Test"
                      onChange={(event) => setwarehouse(event)}
                      options={WareHouseList}
                      isMulti={true}
                      ref={register({ required: "This is required" })}
                      // value={warehouse}
                      placeholder="Select"
                      value={warehouse}
                    />
                    {errors.message && <span className="invalid">This field is required</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    name="poc_mark_default"
                    value={true}
                    checked={checkedOne}
                    onChange={updateOne}
                    id="wer"
                  />
                  <label className="custom-control-label" htmlFor="wer">
                    Mark As Default Primary POC
                  </label>
                </div>
              </Col>
              <Col size="12" className="text-right ">
                <Button color="primary" type="submit" className="mx-2"> <span>{IDS ? "UPDATE" : " SAVE"}</span> </Button>
                <Button color="primary" type="submit" onClick={() => {
                  setPocTag(false);
                  setwarehouse([])
                }}> <span>CANCEL</span> </Button>
              </Col>
              {/* <Row className="RightAlign">
                <Col md="6" className="text-left">
                  <FormGroup>
                    <Button color="primary" type="submit">
                    {IDS ? "UPDATE" : " SAVE"}
                    </Button>
                  </FormGroup>
                </Col>
                <Col md="6" className="">
                  <FormGroup>
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => {
                        setPocTag(false);
                      }}
                    >
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
                      <Button color="primary" type="button" size="md" onClick={() => handleAlertDelete()}>
                        Delete
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col md="6" className="text-left">
                    <FormGroup>
                      <Button
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
export default OrderPoc;
