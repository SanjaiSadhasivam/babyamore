import { Card } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
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

import "react-quill/dist/quill.snow.css";


import "../../../components/partials/default/Custom.css";

import { API_URL, API_Order, token } from "../../../Api";
import Cards from "./Cards";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`;

const Status = ({ smOption, location, Warehouse }) => {
  //model for assign delevery boy
  console.log(smOption, "kkkkkkkkkkkkkkkkkk");
  const [values, setValues] = useState("");
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
  const [isSPMethod, setIsSPMethod] = useState("");
  // const [smOption, setSmOption] = useState([]);
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

  // const handleChangeShip = (event) => {
  //   console.log(event.value);
  //   setIsSPMethod(event)
  // }
  // const EditCoupon = async (ID) => {
  //   let formData = new FormData()
  //   formData.append('status', isSPMethod.value)
  //   await axios.put(`${API_Coupon}/${ID}`, formData, config).then((res) => {
  //     setResMsg(res.data.msg, 'resss');
  //   });
  // }

  return (
    <div className="row">
      <div className="col-md-12">
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-3 alert alert-secondary border-0 d-flex">
                <h5 className="mr-2 mb-0">
                  Order ID : <b>{smOption.length > 0 ? smOption[0].order_no : null}</b>
                </h5>
                <h6>
                  Order Date: <b>{smOption.length > 0 ? smOption[0].createDt.slice(0, 10) : null}</b>
                </h6>
              </div>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-md-6 p-3">
              <h5>Payment: Credit</h5>
              Transaction id : {smOption.length > 0 ? smOption[0].transaction_id : null} <br />
              Customer IP : {smOption.length > 0 ? smOption[0].user_ip : null}
            </div>
            <div className="col-md-6 pt-3">
              <h5>
                Payment Via :{" "}
                <Button size="sm" color="success" className="d-inline">
                  <span style={{ fontSize: "17px" }}>Razor Pay </span>
                  <Icon name="visa" style={{ position: "relative", left: "3px", top: "2px" }}></Icon>
                </Button>
              </h5>
            </div>
          </div>
        </Card>

        {smOption.length > 0
          ? smOption.map((currElement, index) => {
              return (
                <>
                  <div className="" key={index}>
                    <Cards currElement={currElement} location={location} Warehouse={Warehouse} />
                  </div>
                </>
              );
            })
          : null}
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
          </Card>
      </div>
    </div>
  );
};
export default Status;
