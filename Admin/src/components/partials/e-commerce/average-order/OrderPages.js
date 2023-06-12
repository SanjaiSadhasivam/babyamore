import React, { useState, useEffect } from "react";
import { Card, Collapse } from "reactstrap";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";
import { withTheme } from "styled-components";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import User3 from "../../../../images/avatar/a-sm.jpg";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import EditorToolbar, { modules, formats } from "../../../../../src/pages/components/table/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import "../../../style1.css";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../Component";
import axios from "axios";
import { API_URL, token, API_Order } from "../../../../Api";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const OrderPages = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(true);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const [isOpen2, setIsOpen2] = useState(true);
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [isOpen3, setIsOpen3] = useState(true);
  const toggle3 = () => setIsOpen3(!isOpen3);

  const f13 = {
    fontSize: "13px",
  };
  const em1 = {
    fontSize: "1em",
    textAlign: "end",
  };
  const location = useLocation();
  const ID = location.state;
  useEffect(() => {
    Getdata();
  }, []);
  const [OrderData, setOrderData] = useState("");
  const Getdata = async () => {
    const Result = await axios.get(`${API_Order}/?id=${ID}`, config);
    console.log(Result, "opopopopop");
    setOrderData(Result.data.list);
  };
  console.log(OrderData[0],"OrderData[0]");
  // var src= `https://maps.google.com/maps?&q="+${OrderData[0].shippingaddress}"&output=embed`;

  const [sendMessage, setsendMessage] = useState(false);
  const SendMessage = () => {
    setsendMessage(!sendMessage);
  };
  // const { errors, register, handleSubmit } = useForm();
  const [state, setState] = useState({ value: null });
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    SUBJECT: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const pdfDownload = (e) => {
    e.preventDefault();
    let doc = new jsPDF("landscape", "pt", "A3");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save("test.pdf");
      },
    });
  };

  function onFormSubmit(form) {
    const { SUBJECT, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      SUBJECT: SUBJECT,
      purchased: purchased,
      total: total,
      check: false,
    };
    const resetForm = () => {
      setFormData({
        ...formData,
        id: null,
        orderId: "",
        date: new Date(),
        status: "",
        SUBJECT: "",
        purchased: "",
        total: "",
        check: false,
      });
    };
  }
  const handleChange = (value) => {
    setState({ value });
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
  return (
    <div>
      {OrderData ? (
        <Card>
          <div className="row ">
            <div className="col-md-12">
              <div className="accordion accordian-s2 mt-2">
                <div className="accordion-item ">
                  <div className="accordion-head  d-flex justify-content-between" onClick={toggle1}>
                    <p className="title d-flex">
                      <Icon name="user-add-fill" className="d-none"></Icon>
                      <h5 class="ml-0">Customer Details</h5>
                    </p>

                    <span style={{ cursor: "context-menu" }}>
                      {isOpen1 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}
                    </span>
                  </div>
                  <Collapse className="accordion-body" isOpen={isOpen1}>
                    <div className="accordion-inner">
                      <p>
                        <img src={User3} style={{ borderRadius: "50%", width: "15%", height: "15%" }}></img>&nbsp;
                        <span>{OrderData[0].full_name}</span>
                      </p>
                      <p>
                        <b>
                          <h6>Email:</h6>
                        </b>{" "}
                        {OrderData[0].email_address}
                      </p>
                      <p>
                        <b>
                          <h6>Phone Number:</h6>
                        </b>{" "}
                        {OrderData[0].phone_number}
                      </p>
                      <p className="text-muted"></p>
                      <div>
                        <div>
                          <fieldset>
                            <legend style={em1} className="Adress_heading text-left">
                              <h6>Shipping Address</h6>
                            </legend>

                            <p className="text-muted">
                              {OrderData[0].shippingaddress} <br /> <span>Mobile: {OrderData[0].phone_number}</span>
                            </p>
                            <p></p>
                          </fieldset>

                          <fieldset className="mt-2">
                            <legend style={em1} className="Adress_heading text-left">
                              <h6>Billing Address</h6>
                            </legend>

                            <p className="text-muted">
                              {" "}
                              {OrderData[0].Billingaddress}
                              <br />
                              <span>Mobile:{OrderData[0].phone_number}</span>
                            </p>
                          </fieldset>
                        </div>
                      </div>
                      <ul className="d-flex list-unstyled mt-2">
                        <li>
                          <Button size="sm" color="dark" onClick={SendMessage}>
                            SEND MESSAGE
                          </Button>
                        </li>
                        &nbsp;
                      </ul>
                      <div style={{ padding: "20px 0px 10px 0px" }}>
                        <iframe
                          width="100%"
                          height="150"
                          frameborder="0"
                          scrolling="no"
                          marginheight="0"
                          marginwidth="0"
                          src={`https://maps.google.com/maps?&q="+${OrderData[0].shippingaddress}"&output=embed`}
                        ></iframe>
                      </div>
                      {/* <div className="row mt-2">
                      <div className="col-md-12 ">
                        <fieldset>
                          <legend style={em1} >SHIPPING ADDRESS</legend>
                        </fieldset>
                        <fieldset>
                          <legend style={em1}>SHIPPING ADDRESS</legend>
                        </fieldset>
                        <address className="mt-2">
                          995 Paucek Summit Suite 226<br></br>Rowe Port<br></br>North Malvina<br></br><br></br> 67153-8141<br></br>
                          <abbr title="Phone">P:</abbr> +1-206-766-0343
                        </address>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d65369183.36050215!2d0!3d0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1651587406199!5m2!1sen!2sus" width="275" height="200" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <fieldset>
                          <legend style={em1}>BILLING ADDRESS</legend>
                        </fieldset>
                        <small >
                          <Icon name="check-round-cut"></Icon>&nbsp;
                          <lable >SAME AS SHIPPING ADDRESS</lable>
                        </small>
                      </div>
                    </div> */}
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : null}
      {/* SHIPPING CARD */}
      {OrderData.length > 0 &&
        OrderData.map((data) => {
          // loopinc++;
          return (
            <>
              <Card>
                <div className="row ">
                  <div className="col-md-12">
                    <div className="accordion accordian-s2">
                      <div className="accordion-item ">
                        <div className="accordion-head  d-flex justify-content-between" onClick={toggle3}>
                          <p className="title" style={f13}>
                            <h5>Shipping</h5>{" "}
                          </p>

                          <span style={{ cursor: "context-menu" }}>
                            {isOpen3 ? <Icon name="minus"></Icon> : <Icon name="plus"></Icon>}
                          </span>
                        </div>
                        <Collapse className="accordion-body" isOpen={isOpen3}>
                          <div className="accordion-inner">
                            <div style={{ color: "#364a63" }}>
                              <fieldset>
                                <span>
                                  Sub Order ID : <strong>{data.Suborder_id}</strong>
                                </span>
                                <br></br>
                                <span>Tracking ID:</span> <strong> {data.transaction_id} </strong>
                                <br />
                                <span>
                                  Carrier: <strong>{data.carrier}</strong>
                                </span>
                                <br />
                                <span>
                                  Total weight: <strong>{data.weight}</strong>
                                </span>
                                <br />
                                <span>
                                  <a href="#">Tracking url</a>: #
                                </span>
                              </fieldset>
                              <hr></hr>
                            </div>

                            {/* <div style={{ color: "#364a63" }}>
                      <fieldset>
                        <span>Sub Order ID : <strong>OD_001_002</strong></span><br></br>
                        <span>Tracking ID:</span> <strong>  AG5375170807TH </strong>
                        <br />
                        <span>Carrier: <strong></strong></span>
                        <br />
                        <span>Total weight: <strong>6.775 gm</strong></span>
                        <br />
                        <span><a href="#">Tracking url</a>: #</span>
                      </fieldset>
                      <hr></hr>
                    </div>
                    
                    <div style={{ color: "#364a63" }}>
                      <fieldset>
                        <span>Sub Order ID : <strong>OD_001_003</strong></span><br></br>
                        <span>Tracking ID:</span> <strong>  HY63541890VT </strong>
                        <br />
                        <span>Carrier: <strong></strong></span>
                        <br />
                        <span>Total weight: <strong>1,563 gm</strong></span>
                        <br />
                        <span><a href="#">Tracking url</a>: #</span>
                      </fieldset>
                    </div> */}
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          );
        })}
    </div>
  );
};
export default OrderPages;
