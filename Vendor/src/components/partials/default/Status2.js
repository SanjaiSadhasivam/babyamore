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
import { NavLink, useHistory, useLocation } from "react-router-dom";

import "../../../components/partials/default/Custom.css";
// import Invoice from "./Invoice";
import "./Custom.css";

import axios from "axios";
import { API_URL, token, API_Order } from "../../../Api";
// import Cards from "../../../../../Admin/src/components/partials/default/Cards";
import Cardss from "./Cardss";
const API_Image = `${API_URL}/Product_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Status = ({ orderData, location, Warehouse }) => {
  //model for assign delevery boy

  const [values,setValues]=useState("")
  const [isOpendelivery, setIsOpendelivery] = useState(false);
  const Delivery = () => {
    setIsOpendelivery(!isOpendelivery);
  };
  //model for admin note
  const [isSPMethod, setIsSPMethod] = useState("");
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
  // const location = useLocation();
  // const ID = location.state;
  const [smOption, setSmOption] = useState(false);
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const { errors, register, handleSubmit } = useForm();
  useEffect(() => {
    // Getdata();
  }, []);
  const [OrderData, setOrderData] = useState("");
  const Getdata = async () => {
    const Result = await axios.get(`${API_Order}/?id=${ID}`, config);
    setOrderData(Result.data.list[0]);
  };
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
  const handleChangeShip = async (event) => {
    setIsSPMethod(event);
    let formData = new FormData();
    formData.append("status", event.value);
    await axios.put(`${API_Order}/${location.order_no}/${location.Suborder_id}/${location.prod_id}`, formData, config).then((res) => {
      // setResMsg(res.data.msg, "resss");
    });
    // const datas = await axios.put(`${API_Vendor}/${token}`, { isActive: state },config);
    // if (datas) {
    //   getData(token);
    // }
  };
  const handleChangewarehouse = async(e)=>{
    console.log(e.target.value,"fffffffffffffffffff")
    setValues(e.target.value);
    let formData = new FormData();
    formData.append("Warehouse_id", e.target.value);
    await axios.put(`${API_Order}/wareupdate/${location.order_no}/${location.Suborder_id}/${location.prod_id}`, formData, config).then((res) => {
      // setResMsg(res.data.msg, "resss");
    });
  }
  return (
    <div className="row">
      <div className="col-md-12">
        {OrderData ? (
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 p-3 alert alert-secondary border-0 d-flex">
                  <h5 className="mr-2 mb-0">
                    Order ID : <b>{OrderData.order_no}</b>
                  </h5>
                  <h6>
                    Order Date: <b>{OrderData.createDt.slice(0, 10)}</b>
                  </h6>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6 p-3">
                <h5>Payment: Credit</h5>
                Transaction id : {OrderData.transaction_id} <br />
                Customer IP : {OrderData.user_ip}
              </div>
              <div className="col-md-6 pt-3">
                <h5>
                  Payment Via :{" "}
                  <Button size="sm" color="success" className="d-inline">
                    <span style={{ fontSize: "17px" }}>Razor Pay </span>
                    <Icon name="visa" style={{ position: "relative", left: "3px", top: "2px" }}></Icon>
                  </Button>
                </h5>
                {/* <h5>Order 2 : <Button size="sm" color="success" className="d-inline"style={{}}>Cash on delivery <Icon name="cc-mc" style={{position:"relative",left:"3px",top:"2px"}}></Icon></Button></h5> */}
              </div>
            </div>
          </Card>
        ) : null}
        <div className="card-title-group my-3">
          <div className="card-header w-100">
            <h5 className="title">Order details</h5>
          </div>
        </div>

        {/*order start*/}
        {orderData.map((currEle) => {
          return (
            <>
            <Cardss  currEle={currEle} Warehouse={Warehouse} location={location} />
            </>
          );
        })}

        <div>
          <hr />
        </div>
        

        

        <Card>
          <div className="row">
            <div className="col-md-6 col-sm-3 d-flex align-items-end justify-content-start">
              <div className="ml-3 mb-3">
                {/* <Button size="sm" className="btn-dim" color="dark">INVOICE &nbsp;<Icon name="arrow-to-down"></Icon></Button> */}
              </div>
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
                      <span className="ml-2">INR {OrderData.sub_total}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span>Discount </span>{" "}
                    </th>
                    <td>
                      <span>INR {OrderData.total_discount}</span>
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
                      <p>INR {OrderData.total}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Status;
