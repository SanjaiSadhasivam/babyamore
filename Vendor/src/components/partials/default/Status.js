import { Card } from "reactstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
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
import logo from '../../../assets/images/jsTree/Baby-Logo.png'
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import "../../../components/partials/default/Custom.css";
import { API_URL, token, API_Order } from "../../../Api";
// import Invoice from "./Invoice";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`;
const Status = ({ orderData, ID,Infotable,sub}) => {
  //model for assign delevery boy
  const history = useHistory();
  const [isOpendelivery, setIsOpendelivery] = useState(false);
  const Delivery = () => {
    setIsOpendelivery(!isOpendelivery);
  };
  //model for admin note
  const [isOpenadminNote, setIsOpenadminNote] = useState(false);
  const addadminnote = () => {
    setIsOpenadminNote(!isOpenadminNote);
  };
  //tooltip for admin
  const [tooltipOpenadmin, settooltipadmin] = useState(false);
  const Admintooltipadmin = () => {
    settooltipadmin(!tooltipOpenadmin);
  };
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
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
  const download = async () => {
    const Result = await axios.get(`${API_Order}/exportinvoice/${ID}`, config);
    const invoice = Result.data.list;
    console.log(invoice,"OrderData1")
    if (Result.data.list.length > 0) {
      const doc = new jsPDF();

      doc.addImage(logo, "png", 14, 13, 70, 15);
      autoTable(doc, {
        margin: { top: 15, left: 15, right: 15, bottom: 10 },
        body: [
          [
            
            {
              content: "West Star Retail and Trading Private Limited"+"\nOffice No 2B, Apex Plaza, 2nd Floor"+"\nNo 3 Uthamar Gandhi, Anna Salai,"+"\nNungambakkam,"+"\nChennai – 600034"+"\nTamil Nadu"+"\n9697612222"+"\nGST: 33AACCW3170E1ZO",
              styles: {
                halign: "right",
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        margin: { top: 15, left: 14, right: 15, bottom: 10 },
        body: [
          [
            {
              content:"INVOICE",
              styles: {
                halign: "left",
                fontSize:20,
                fontStyle:"bold",
                font: 'helvetica',   
              },
            },
          ],
        ],
        theme: "plain",
      });
     
      autoTable(doc, {
        body: [
          [
            {
              content:
                `${orderData[0].full_name}`+
                `\n${orderData[0].Billingaddress}`,
              styles: {
                halign: "left",
                overflow:"linebreak",
                // font: 'helvetica',
                valign:"middle"   
              },
              
            
              
            },
            {
                      content:
                        `Order Number: ${orderData[0].order_no}` +
                        // `\nSub Order ID: ${invoice[0].Suborder_id}`+
                        `\nInvoice Date: ${invoice[0].createDt.slice(0, 10)}`+
                        `\nPayment Method: Cash on Delivery`,
                      styles: {
                        halign: "right",
                      },
                    },
          ],
        ],
        theme: "plain",
      });


      autoTable(doc, {
        head: [["S.No", "Product", "Qty", "Price", "Total"]],
      

        body: Infotable,
        theme: "grid",
        headStyles: {
          fillColor: "#000",
        },
      });

      autoTable(doc, {
  
        body: [
          [
            {
              content: `Subtotal : Rs.${Math.round(sub)}`,
              styles: {
                halign: "right",
              
                border: {top: 23, right: 20, bottom: 20, left: 20},
              },
             
            },
          ],
          [
            {
              content: `Shipping : Free shipping`,
              styles: {
                halign: "right",
              },
             
            },
          ],
          [
            {
              content:`Redeemed Points Value: -Rs.${invoice[0].redeem_point}.00`,
              styles: {
                halign: "right",
              },
             
            },
          ],

          [
            {
              content: `Total : Rs.${Math.round(sub)}`,
              styles: {
                halign: "right",
                // lineWidth:1,

             
              },
            },
          ],
        ],
        theme: "plain",
      });

      autoTable(doc, {
        body: [
          [
            {
              content: "Terms & notes",
              styles: {
                fontSize: 12,
                halign: "left",
              },
            },
          ],
          [
            {
              content:
                "Abbreviations for “Cash with Order”, you expect the customer to pay when ordering from you before you start working on the project / delivering the products",
              styles: {
                halign: "left",
              },
            },
          ],
        ],
        theme: "plain",
      });
      autoTable(doc, {
        body: [
          [
            {
              content: "Thank You For Your Order",
              styles: {
                fontSize: 10,
                halign: "center",
              },
            },
          ],
        ],
        theme: "plain",
      });
     
      return doc.save(`${orderData[0].order_no}`);
    }
  };

  // const download = async () => {
  //   const Result = await axios.get(`${API_Order}/exportinvoice/${ID}`, config);
  //   const invoice = Result.data.list;
  //   if (Result.data.list.length > 0) {
  //     const doc = new jsPDF();
  //     doc.addImage(logo, "png", 10, 10, 50, 20);
  //     autoTable(doc, {
  //       margin: { top: 15, left: 15, right: 15, bottom: 10 },
  //       body: [
  //         [
  //           {
  //             content: "Invoice",
  //             styles: {
  //               halign: "right",
  //               fontSize: 20,
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           // {
  //           //   content: "From:" + "\n" + "Anna Salai,\nNungambakkam Chennai,\nTamil Nadu 600034",
  //           //   styles: {
  //           //     halign: "left",
  //           //   },
  //           // },
  //           {
  //             content:
  //               `Order ID: ${orderData[0].order_no}` +
  //               // `\nSub Order ID: ${invoice[0].Suborder_id}`+
  //               `\nInvoice Date: ${invoice[0].createDt.slice(0, 10)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: `Billing Address:` + "\n" + `\n${orderData[0].full_name}` + `\n${orderData[0].Billingaddress}`,
  //             styles: {
  //               halign: "left",
  //             },
  //           },
  //           {
  //             content: "Shipping Address:" + "\n" + `\n${orderData[0].full_name}` + `\n${orderData[0].shippingaddress}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Products",
  //             styles: {
  //               fontSize: 14,
  //               halign: "left",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       head: [["S.No", "Invoice Number", "Product", "Qty", "Price", "Total"]],
  //       body: Infotable,
  //       theme: "striped",
  //       headStyles: {
  //         fillColor: "#343a40",
  //       },
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: `Sub Total : Rs.${Math.round(sub)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //         [
  //           {
  //             content: `Grand Total : Rs.${Math.round(sub)}`,
  //             styles: {
  //               halign: "right",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Terms & notes",
  //             styles: {
  //               fontSize: 12,
  //               halign: "left",
  //             },
  //           },
  //         ],
  //         [
  //           {
  //             content:
  //               "Abbreviations for “Cash with Order”, you expect the customer to pay when ordering from you before you start working on the project / delivering the products",
  //             styles: {
  //               halign: "left",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     autoTable(doc, {
  //       body: [
  //         [
  //           {
  //             content: "Thank You For Your Order",
  //             styles: {
  //               fontSize: 10,
  //               halign: "center",
  //             },
  //           },
  //         ],
  //       ],
  //       theme: "plain",
  //     });
  //     return doc.save(`${orderData[0].order_no}`);
  //   }
  // };
console.log(Infotable,"orderData")
const handleView = (dataone,datatwo,dataThree)=>{
  const id={
    "order_no":datatwo,
    "Suborder_id":dataone,
    "prod_id":dataThree,
}
  history.push({pathname: "/dashboard/orders-lists1",state:id});
}

  return (
    <div className="row">
      <div className="col-md-12">
      {orderData ? (
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 p-3 alert alert-secondary border-0 d-flex">
                  <h5 className="mr-2 mb-0">
                    Order ID: <b>{orderData.length > 0 ? orderData[0].order_no:null}</b>
                  </h5>
                  <h6>
                    Order Date: <b>{orderData.length > 0 ? orderData[0].createdt.slice(0, 10) : null}</b>
                  </h6>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6 p-3">
                <h5>Payment: Credit</h5>
                Transaction id : {orderData.length > 0 ?orderData[0].transaction_id:null} <br />
                Customer IP : {orderData.length > 0 ?orderData[0].user_ip:null}
              </div>
              <div className="col-md-6 pt-3">
                <h5>
                  Payment Via :{" "}
                  <Button size="sm" color="success" className="d-inline">
                    <span style={{ fontSize: "17px" }}>Razor Pay </span>
                    <Icon name="visa" style={{ position: "relative", left: "3px", top: "2px" }}></Icon>
                  </Button>
                </h5>
                <h5>
               Invoice :
                  <Button size="sm" className="btn-dim d-inline mx-2" onClick={()=>download()} style={{  height: "100%" }} color="dark">
                    Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon>
                  </Button>
                </h5>
                {/* <h5>Order 2 : <Button size="sm" color="success" className="d-inline"style={{}}>Cash on delivery <Icon name="cc-mc" style={{position:"relative",left:"3px",top:"2px"}}></Icon></Button></h5> */}
              </div>
            </div>
          </Card>
        ) : null}
   

        <Card>
          <div className="card-inner">
            <div className="card-title-group mb-2">
              <div className="card-title">
                <h6 className="title">Order details</h6>
              </div>
              <h6 className="no-users text-bold" style={{ padding: "10px", margin: "10px" }}>
                {" "}
              </h6>
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
                            <div className="text-editor" style={{ minHeight: "100px" }}>
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
                                <div {...getRootProps()} className="dropzone upload-zone small my-2 dz-clickable">
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

                        <Col size="12">
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
            {
            orderData.map((currEle)=>{
              return(
                <>
                  <Card className="p-3">
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="shipdea">
  
  
                  <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-6">
                      <h6 className="d-inline">
                        <span className="font-weight-bold">Sub Order ID : <span style={{ fontSize: "15px",color: "rgb(252, 129, 129)" ,cursor:"pointer" }} onClick={()=>handleView(currEle.Suborder_id,currEle.order_no,currEle.product_id)}>{currEle.Suborder_id}</span></span>
                      </h6>
                    
                      {/* <span class="d-block mt-2 mb-1"><img className="imgcour" src="https://uploads-ssl.webflow.com/5ef27cb65411b70949a151e9/5f17078fcfae300fc5b3d69c_download%20(16).png" /></span> */}
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
                    <div className="col-sm-2">
                      <span className="btn btn-success fw-normal fs-6 p-1 mr-2">Delivered</span>
                    </div>
                    <div className="col-sm-3">
                      <span className="btn btn-outline-success fw-normal p-1">Track Shipment</span>
                    </div> */}
                    {/* <div className="col-sm-3">
                      <RSelect
                        options={[
                          { value: "New orders", label: "New orders" },
                          { value: "Preparing", label: "Preparing" },
                          { value: "Ready to Handover", label: "Ready to Handover" },
                          { value: "Shipped", label: "Shipped" },
                          { value: "Completed", label: "Completed" },
                          { value: "RTO In-transit ", label: "RTO In-transit" },
                          { value: "Returned ", label: "Returned" },
                          { value: "Refunded ", label: "Refunded" },
                          { value: "Partially refunded ", label: "Partially refunded" },
                          { value: "Lost (AWB) ", label: "Lost (AWB)" },
                          { value: "Cancelled ", label: "Cancelled" },
                          { value: "Upcoming orders ", label: "Upcoming orders" },
                        ]}
                       
                      />
                    </div> */}
  
                    {/* <div className="col-sm-4">
                      <Button size="sm" className="btn-dim" style={{ width: "82%", height: "100%" }} color="dark">Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon></Button>
                    </div>
   */}
                  {/* </div> */}
  
                  <div className="alert alert-success p-1 mt-2 mb-2">
                    Delivered on Tue, Sep 28
                  </div>
                </div>
  
                <div className="row p-0">
                  <div className="col-md-6 mb-2">
                    <span class="d-block"><span style={{ fontWeight: 'bold' }}>Vendor :</span>{currEle.company_name}</span>
                    <span><span style={{ fontWeight: 'bold' }}>Warehouses : </span>{currEle.warehouse_name}</span>
                  </div>
                  <div className="col-md-12 d-flex justify-content-between mb-2">
                    <div className="prod-com d-flex ">
                      <div className="images1">
                        <img src={`${API_Image}/${currEle.ProductImage}`} className="border-radius-50 imagprod border mr-2"></img>
                      </div>
  
                      <div>
                        <h5 className="mb-1 fs-6">{currEle.productname}</h5>
                        <h6 className="mb-1 fs-6">Quantity : {currEle.qty}</h6>
                        <span>Price : INR {currEle.SalePrice}</span>
                        <span>Sku : {currEle.SKU}</span>
                        <span>HSN Code: {currEle.HSN}</span>
                        <span>EAN: {currEle.EAN}</span>
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
                        <option label="Approved" value=""></option>
                        <option label="Out of Stock" value=""></option>
  
                      </select>
  
                    </div>
  
                    <div>
                      <span className="btn btn-danger p-1 mr-5">Submit</span>
                    </div>
                  </div> */}
  
  
  
                  {/* <div className="col-md-6 mb-2">
                      <span><span style={{ fontWeight: 'bold' }}>Sub Order ID :</span>OD_001_002</span>
                      <span class="d-block"><span style={{ fontWeight: 'bold' }}>Vendor :</span> Erex Enterprises</span>
                      <span><span style={{ fontWeight: 'bold' }}>Warehouses :</span> Erode</span>
                    </div>
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
                    <div className="col-md-12 d-flex mb-3">
  
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
                          <option label="Approved" value=""></option>
                          <option label="Out of Stock" value=""></option>
  
                        </select>
  
                      </div>
  
                      <div>
                        <span className="btn btn-danger p-1 mr-5">Submit</span>
                      </div>
                    </div> */}
  
  
                  {/* <div className="col-md-6 mb-2">
                      <span><span style={{ fontWeight: 'bold' }}>Sub Order ID :</span>OD_001_003</span>
                      <span class="d-block"><span style={{ fontWeight: 'bold' }}>Vendor :</span> Erex Enterprises</span>
                      <span><span style={{ fontWeight: 'bold' }}>Warehouses :</span> Erode</span>
                    </div>
  
  
  
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
  
                    <div className="col-md-12 d-flex mb-3">
  
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
                          <option label="Approved" value=""></option>
                          <option label="Out of Stock" value=""></option>
  
                        </select>
  
                      </div>
  
                      <div>
                        <span className="btn btn-danger p-1 mr-5">Submit</span>
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </Card>
                
                
                
                </>
              )
            })
          }
       
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
                {/* <div className="ml-3 mb-3">
                  <Button size="sm" className="btn-dim" onClick={() => download()} color="dark">
                    INVOICE &nbsp;<Icon name="arrow-to-down"></Icon>
                  </Button>
                </div> */}
              </div>

              <div className="col-md-6 col-sm-9 mt-2">
                <table className="table  table-responsive d-flex justify-content-end ">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody className="text-right">
                    <tr>
                      <th>
                        <span>Sub Total</span>{" "}
                      </th>
                      <td>
                        <span className="ml-2">INR 2967.53</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Discount </span>{" "}
                      </th>
                      <td>
                        <span>INR 0.00</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Shipping</span> <br></br>
                      </th>
                      <td>
                        <span>INR 5.00</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Packaging</span>
                      </th>
                      <td>
                        <span>INR 0.00</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Handling</span>
                      </th>
                      <td>
                        <span>INR 2.00</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Taxes</span> <br></br>
                        <small>Domestic 0%</small>
                        <br />
                        <small>GST 0%</small>
                      </th>
                      <td>
                        <span>INR 0.00</span>
                      </td>
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
export default Status;
