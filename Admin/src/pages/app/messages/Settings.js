import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./custom.css";
import Sample from "../../../images/1.svg";
import Sample1 from "../../../images/paypal-express.png";
import Sample2 from "../../../images/stripe.png";
import Sample3 from "../../../images/authorize-net.png";
import Sample4 from "../../../images/instamojo.png";
import Sample5 from "../../../images/cod.png";
import Sample6 from "../../../images/wire.png";
import Sample7 from "../../../images/paystack.png";
import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  ReactDataTable,
  PreviewCard,
  Button,
  Icon,
  UserAvatar,
  Row,
  Col,
  RSelect,
  Block,
  DataTableHead,InputSwitch,
  DataTableRow,
} from "../../../components/Component";
import {
  DisputesTableData,
  disputesTableColumns,
  disputesTableColumns2,
  userData,
} from "../../components/table/TableData";
import { messageData } from "./MessageData";
import Simplebar from "simplebar-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { findUpper } from "../../../utils/Utils";
import MessageItem from "./MessageItem";
import ContentAlt from "../../../layout/content/ContentAlt";
import { FormGroup, Label, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";

const AppSettings = () => {
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });
  const [state, setState] = useState({ value: null });

  const handleChange = (value) => {
    setState({ value });
  };

  const { errors, register, handleSubmit } = useForm();
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const [files1, setFiles1] = useState([]);

  const onFormSubmit = (form) => {
    const { customer, purchased, list, add, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      paid: formData.paid,
      total: total,
      list: "",
      add: "",
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
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

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  useEffect(() => {
    if (filterText !== "") {
      const filteredData = messageData.filter((item) => {
        return (
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.messageTitle.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData([...filteredData]);
    } else {
      setData(filteredTabData);
    }
  }, [filterText, filterTab, filteredTabData]);

  useEffect(() => {
    let filteredData;
    if (filterTab === "1") {
      setTabData(basic);
    } else if (filterTab === "2") {
      setTabData(formatsss);
    } else if (filterTab === "3") {
      setTabData(support);
    } else if (filterTab === "4") {
      setTabData(order);
    } else if (filterTab === "5") {
      setTabData(review);
    }
    else {
      setTabData(notifications);
    }
  }, [filterTab]);

  const onchangereview = ({ target: { name, value } }) => {
    setReview({ ...Review, [name]: value });
  };
  const ReviewClick = () => {
    if (Review.reviewmsg) {
      setReviewerror(null);
    } else {
      setReviewerror("* This field is required");
    }
  };
  const basic = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        
        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="g-3">
              <Col md="6">
                <Row className="g-3">
                <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      <h6>SUBSCRIPTIONS (DISABLED)*</h6>
                        <hr />
                      </label>
                   
                    </div>
                  </Col>
                 

                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      TRIAL PERIOD:
                        
                      </label>
                      
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                          placeholder="13"
                          onChange={(e) => onInputChange(e)}
                          ref={register({
                            required: "This field is required",
                          })}
                          defaultValue={formData.customer}
                          disabled
                        />
                        {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      REQUIRED CARD UPFRONT:*
                      </label>
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="paid">
                      <h6>VENDORS*</h6>
                      <hr />
                      </label>
                   
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      VENDOR NEEDS APPROVAL:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      CAN USE OWN CATALOG ONLY:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW MERCHANT INFO AS VENDOR:  
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      VENDOR CAN VIEW CUSTOMER INFO:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      ENABLE LIVE CHAT:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      ORDER CANCELLATION FEE:
                      </label>
                      <div className="form-row">
                        <div className="input-group"> 
                          <span className="input-group-addon">$</span>
                          <input type="number" 
 onmousewheel="return false;" onWheelCapture={e => {
  e.target.blur()
}} defaultValue={0.00} min={0} step="0.01" data-number-to-fixed={2} data-number-stepfactor={100} className="form-control currency" id="c2" disabled />
                        </div>
                      </div>

                    </div>
                  </Col>
                  
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      <h6>CUSTOMERS*</h6>
                        <hr />
                      </label>
                   
                    </div>
                  </Col>

                  

                  

                  
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      CAN CANCEL ORDER WITHIN:*
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="purchased"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.purchased}
                        />
                        {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      ASK CUSTOMER FOR EMAIL SUBSCRIPTION:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
             
                  
                

                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      SHOW SOCIAL AUTH:
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
               
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                        <label className="form-label" htmlFor="purchased">
                        ALLOW GUEST CHECKOUT: 
                        </label>
                        <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                      </div> 
                  </Col>
                 
                </Row>
              </Col>
              <Col md="6">
                <Row className="g-3">
                <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      <h6> INVENTORY</h6>
                        <hr />
                      </label>
                   
                    </div>
                  </Col>
                  

                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW ITEM CONDITIONS
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      IMAGE SIZE LIMIT IN KB:
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                          placeholder="Title"
                          onChange={(e) => onInputChange(e)}
                          ref={register({
                            required: "This field is required",
                          })}
                          defaultValue={formData.customer}
                        />
                        {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      NUMBER OF INVENTORY IMAGES:
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="SKU"
                          name="purchased"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.purchased}
                        />
                        {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="paid">
                      <h6>UNITS</h6>
                      <hr />
                      </label>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      * UNIT OF WEIGHT:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "Gram(g)", label: "Gram(g)" },
                            { value: "Kilogram(kg)", label: "Kilogram(kg)" },
                            { value: "Pound(lb)", label: "Pound(lb)" },
                            { value: "Ounce(oz)", label: "Ounce(oz)" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                     
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      * UNIT OF LENGTH:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "Centimeter(cm)", label: "Centimeter(cm)" },
                            { value: "Meter(m)", label: "Meter(m)" },
                            { value: "inch(in)", label: "inch(in)" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      * UNIT OF VALUME:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "Liter(L)", label: "Liter(L)" },
                            { value: "gallon(gal)", label: "gallon(gal)" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="paid">
                      <h6> VIEWS</h6>
                      <hr />
                      </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                         Pagination
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                          name="number"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.pagination}
                        />
                        {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW SEO INFO TO FRONTEND
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="paid">
                      <h6>ADDRESS</h6>
                      <hr />
                      </label>
                    </div>
                  </Col>
                  
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      DEFAULT COUNTRY:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "India", label: "India" },
                            { value: "United Arab Emirates", label: "United Arab Emirates" },
                            { value: "Afganistan", label: "Afganistan" },
                            { value: "Bangladesh", label: "Bangladesh" },
                            { value: "China", label: "China" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                    </div>
                  </Col>
                  
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      DEFAULT STATE:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "Abu Dhabi", label: "Abu Dhabi" },
                            { value: "Ajman", label: "Ajman" },
                            { value: "Dubai", label: "Dubai" },
                            { value: "Sharjah]", label: "Sharjah]" },
                            { value: "Al Fujayrah", label: "Al Fujayrah" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW ADDRESS TITLE:  
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                   <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW COUNTRY NAME IN ADDRESS:  
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW MAP:  
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                </Row>
                </Col>
            </Row>
          </form>
          <Col size="12" className="text-center mt-3">
                    <Button color="primary" type="submit">
                      <span>UPDATE</span>
                    </Button>
                  </Col>
        </div>
      </div>
    );
  };

  const formatsss = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">
          <Col md="6">
            <Row className="g-3">
            <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="paid">
                      <h6>CURRENCY</h6>
                      <hr />
                      </label>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      *DECIMALS:
                      </label>
                      <div className="form-control-wrap">
                        <RSelect
                          name="paid"
                          options={[
                            { value: "0", label: "0" },
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                          onChange={(e) => setFormData({ ...formData, paid: e.value })}
                          defaultValue={formData.paid}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      SHOW CURRENCY SYMBOL: 
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
                   <Col md="12">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="customer">
                      PUT A SPACE AFTER THE SYMBOL:  
                      </label>
                      <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    </div>
                  </Col>
              <Col size="4">
                <Button color="primary" type="submit">
                  <span>UPDATE</span>
                </Button>
              </Col>
            </Row>
          </Col>
            <Col md="6">
            <Row className="g-3">
                <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="paid">
                      <h6>PROMOTIONS</h6>
                        <hr />
                      </label>
                   
                    </div>
                  </Col>
                  
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                       COUPON CODE SIZE:
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                          name="number"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.pagination}
                        />
                        {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                      </div>
                    </div>
                  </Col>
            </Row>
          </Col>
          </Row>
          </form>
        </div>
      </div>
    );
  };

  const support = () => {
    return (
      <div>
      <div className="pay" style={{ backgroundColor: "white", margin: "10px 20px" }}>
          <p className="text-center">The system offers various types of payment gateways. You can enable/disable any payment gateway to control payment options vendor can use to accept payment from customers.</p>
        </div>
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        
      <div className="mt-4">
        
        <Row className="g-3">
          <Col md="6">
            <Row className="g-3">
            <Col md="12">
            <img src={Sample} />
            <p>Allow vendors to accept the most convenient payment option.</p>
                  </Col>
            </Row>
          </Col>
            <Col md="6">
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample1} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Add PayPal as a payment method to any checkout with Express Checkout. Express Checkout offers the ease of convenience and security of PayPal, can be set up in minutes and can turn more shoppers into buyers.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>
                    <Button color="primary" type="submit">
                      <span>Documentation</span>
                    </Button>
                      </li>
                    </ul>
                    
                  </Col>
                  
            </Row>
          </Col>
        </Row>
        <hr/>
        <Row className="g-3">
          <Col md="6">
            <Row className="g-3">
            <Col md="12">
            <p className="lead">Accept credit cards</p>
            <p>Enable at least one credit card payment method to allow vendors to charge credit cards. This can be offered with other payment solutions such as PayPal Express Checkout.</p>
                  </Col>
            </Row>
          </Col>
            <Col md="6">
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample2} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Stripe is one of the best and safe option to charge credit and debit cards around the world. Stripe has a product for marketplace like this. To enable Stripe to your vendors, you must have to register your platform with Stripe.</p>
                    <b>Follow This Simple steps:</b>
                    <p>- Create an Stripe application using the bellow information.<a href=""> Check their documentation for help.</a></p>
                    <p>- Update the .env file on your server with Stripe API credentials.</p>
                    <p><b>Remember</b>when you register your platform use this information:</p>
                    <p>- Name: 'BabyAmore Marketplace'</p>
                    <p>- Website URL: 'BabyAmore'</p>
                    <p>- Redirect URL: 'BabyAmore'</p>

                    <Button color="primary" type="submit">
                      <span>Documentation</span>
                    </Button>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample3} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Authorize.Net helps makes it simple to accept electronic and credit card payments.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>

                    <Button color="primary" type="submit">
                      <span>Documentation</span>
                    </Button>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample4} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Instamojo is one of the most popular and Multi-Channel Payment Gateway for India - Accept Credit/Debit Cards, Wallets, Net Banking, UPI & EMI. Enable Instamojo to your vendors.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>

                    <Button color="primary" type="submit">
                      <span>Documentation</span>
                    </Button>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
            
          </Col>
        </Row>
        <hr/>
        <Row className="g-3">
          <Col md="6">
            <Row className="g-3">
            <Col md="12">
            <p className="lead">Manual payment</p>
            <p>Enabling offline payment options will allow vendors to change their customer in more traditional ways. The vendor will be asked for instructions and additional information when they activate manual payment methods.</p>
                  </Col>
            </Row>
          </Col>
            <Col md="6">
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample5} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Cash on delivery (COD), sometimes called collect on delivery, is the sale of goods by mail order where payment is made on delivery rather than in advance.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample6} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Pay by bank wire transfer, transfer the invoice amount via wire tranfer to the merchant account and confirm manually. After payment confirmation the goods will be shipped.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
          </Col>
        </Row>
        <hr/>
        <Row className="g-3">
          <Col md="6">
            <Row className="g-3">
            <Col md="12">
            <p className="lead">Other payment options</p>
            <p>Enabling more payment options will allow vendors to change their customer in more flexible ways.</p>
                  </Col>
            </Row>
          </Col>
            <Col md="6">
            <Row className="g-3">
                <Col md="12">
                    <ul>
                      <li className="list-group-name">
                      <img src={Sample7} />
                      <label className="switch" style={{float: 'right'}}>
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>
                    <p>Modern online and offline payments for Africa. Paystack helps businesses in Africa get paid by anyone, anywhere in the world.</p>
                    <div className="alert alert-info small">
                      <strong className="text-uppercase">
                      <Icon name="info"></Icon>
                      important:
                      </strong>
                      <span> When vendors get paid directly, you can't charge marketplace commission and per transaction fee with this payment method. With the zCart wallet module you can charge the marketplace commission and transaction fee.</span>
                    </div>
                    <Button color="primary" type="submit">
                      <span>Documentation</span>
                    </Button>
                      </li>
                    </ul>
                    
                  </Col>
            </Row>
          </Col>
        </Row>
        <hr/>
      </div>
    </div>
    </div>
    );
  };

  const order = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        
      <div className="mt-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-3">
            <Col md="12">
              <Row className="g-3">
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    SUPPORT PHONE:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-call"></em>
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        placeholder="&nbsp;&nbsp;Support Phone"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="purchased">
                    TOLL FREE NUMBER:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-call"></em>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="purchased"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.purchased}
                      />
                      {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    *SUPPORT EMAIL:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-mail"></em>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="&nbsp;&nbsp;support@demo.com"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    *DEFAULT SENDER EMAIL ADDRESS:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-mail"></em>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="&nbsp;&nbsp;Sender Email address"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    *DEFAULT SENDER FULL NAME:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-mail"></em>
                      <input
                        type="text"
                        className="form-control"
                        name="text"
                        placeholder="&nbsp;&nbsp;Fullname"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.customer}
                      />
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col md="12">
                  <div className="form-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="paid">
                    <h6> SOCIAL LINKS</h6>
                    <hr />
                    </label>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                      GOOGLE PLUS:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-google"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://plus.google.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    FACEBOOK:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-facebook-f"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://www.facebook.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    TWITTER:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-twitter"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://twitter.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
                
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    PINTEREST:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-pinterest-round"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://www.pinterest.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
                
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    INSTAGRAM:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-instagram"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://www.instagram.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="customer">
                    YOUTUBE:
                    </label>
                    <div className="form-control-wrap">
                    <em class="icon ni ni-youtube-fill"></em>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="&nbsp;&nbsp;https://www.youtube.com/"
                        name="text"
                        ref={register({ required: "This is required" })}
                        defaultValue={formData.pagination}
                      />
                      {errors.pagination && <span className="invalid">{errors.pagination.message}</span>}
                    </div>
                  </div>
                </Col>
              </Row>
              </Col>
          </Row>
        </form>
        <Col size="12" className="text-center mt-3">
                  <Button color="primary" type="submit">
                    <span>UPDATE</span>
                  </Button>
                </Col>
      </div>
    </div>
    );
  };

  const review = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        <div className=" mob-card">
          <div className="border-bottom card-body p-3 position-relative">
          <Col md="12">
                  <div className="form-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="paid">
                    <h6>VISITORS</h6>
                    <hr />
                    </label>
                  </div>
                </Col>
                <Col md="6">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                     GOOGLE ANALYTIC REPORT:
                     <p>The changes can take up to 1 Day to affect the result.</p>
                      </label>
                      
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                  </Col>
          </div>
        </div>
      </div>
    );
  };

  const notifications = () => {
    return (
      <div className="p-2" style={{ backgroundColor: "white", margin: "10px 20px" }}>
        <div className=" mob-card">
          <div className="border-bottom card-body p-3 position-relative">
          <Col md="12">
                  <div className="form-group d-flex justify-content-between">
                    <label className="form-label" htmlFor="paid">
                    <h6>NOTIFICATIONS</h6>
                    <hr />
                    </label>
                  </div>
                </Col>
                <Col md="6">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      New Vendor Registered:
                      </label>
                      
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      New Message:
                      </label>
                      
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      New Ticket:
                      </label>
                      
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group d-flex justify-content-between">
                      <label className="form-label" htmlFor="purchased">
                      When Dispute Applead:
                      </label>
                      
                     <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider round" />
                    </label>

                    </div>
                </Col>
          </div>
        </div>
      </div>
    );
  };
  const onSearchBack = () => {
    setOnSearch(false);
    setFilterText("");
  };

  const onClosed = (id) => {
    let newData = data;
    const index = newData.findIndex((item) => item.id === id);
    newData[index].closed = true;
    setData([...newData]);
  };

  const onMessageClick = (id) => {
    setSelectedIt(id);
    if (window.innerWidth <= 990) {
      setMobileView(true);
    }
  };

  return (
    <React.Fragment>
      <Head title=" Configuration"></Head>
      <ContentAlt>
        <div className="nk-msg">
          <div className="nk-msg-aside hide-aside">
            <div className="nk-msg-nav">
              <ul className="nk-msg-menu">
                <li className={`nk-msg-menu-item ${filterTab === "1" && " active"}`} onClick={() => setFilterTab("1")}>
                  <a
                    href="#active"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    BASIC SETTINGS 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "2" && " active"}`} onClick={() => setFilterTab("2")}>
                  <a
                    href="#closed"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    FORMATS 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "3" && " active"}`} onClick={() => setFilterTab("3")}>
                  <a
                    href="#stared"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    PAYMENTS METHODS 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "4" && " active"}`} onClick={() => setFilterTab("4")}>
                  <a
                    href="#all"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    SUPPORT 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "5" && " active"}`} onClick={() => setFilterTab("5")}>
                  <a
                    href="#something"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    REPORTS 
                  </a>
                </li>
                <li className={`nk-msg-menu-item ${filterTab === "6" && " active"}`} onClick={() => setFilterTab("6")}>
                  <a
                    href="#something"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                  >
                    NOTIFICATIONS 
                  </a>
                </li>
              </ul>
            </div>

            <Simplebar className="nk-msg-list">{tabData}</Simplebar>
          </div>
          {/*nk-aside*/}
          {/* <MessageItem
            id={selectedId}
            onClosed={onClosed}
            data={data}
            setMobileView={setMobileView}
            mobileView={mobileView}
          /> */}
        </div>
      </ContentAlt>
    </React.Fragment>
  );
};
export default AppSettings;
