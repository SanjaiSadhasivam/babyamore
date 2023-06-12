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
import Invoice from "./Invoice";

const Status4 = () => {
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
      Status4: formData.Status4,
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
    Status4: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const [odStatus4, setOdStatus4] = useState();

  return (
    <div className="row">
      <div className="col-md-12">
        <Card >
          <div className="container-fluid">

            <div className="row">

              <div className="col-md-12 p-3 alert alert-secondary border-0 d-flex">
                <h5 className="mr-2 mb-0">Order ID : <b>OD-001</b></h5>
                <h6>Order Date: <b>28-12-20222</b></h6>
              </div>

            </div>
          </div>
          <div className="row p-2">
            <div className="col-md-6 p-3">
              <h5>Payment: Credit</h5>
              Transaction  id : 2562426 <br />
              Customer IP : 654896
            </div>
            <div className="col-md-6 pt-3">
              <h5>Payment Via : <Button size="sm" color="success" className="d-inline"><span style={{ fontSize: "17px" }}>Razor Pay </span><Icon name="visa" style={{ position: "relative", left: "3px", top: "2px" }}></Icon></Button></h5>
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


            {/*order start*/}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="shipdea">


                  <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-6">
                      {/* <h6>Order id : #BA001_01</h6> */}
                      <span class="d-block">Sub Order ID : OD_001_003</span>
                      <span class="d-block">Vendor : Erex Enterprises</span>
                      <span>Warehouses : Ashok Nagar</span>
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

                  <div className="row d-flex justify-content-between">
                    <div className="col-sm-2">
                      <span className="btn btn-success fw-normal fs-6 p-1 mr-2">Delivered</span>
                    </div>
                    <div className="col-sm-3">
                      <span className="btn btn-outline-success fw-normal p-1">Track Shipment</span>
                    </div>
                    <div className="col-sm-3">
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
                    </div>

                    <div className="col-sm-4">
                      <Button size="sm" className="btn-dim" style={{ width: "82%", height: "100%" }} color="dark">Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon></Button>
                    </div>

                  </div>

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
                  </div>


                  {/* <div className="col-md-12 d-flex justify-content-between">
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
                  </div> */}

                  {/* <div className="col-md-12 d-flex mb-3">

                    <div className="mr-3">
                      <select
                        name=""
                        
                        className="form-control form-select"
                        id="fv-topics"
                        placeholder="Select a option"
                        style={{ width: "150px" }}
                      >
                        <option label="Select" value=""></option>
                        <option label="Select.." value=""></option>

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
                      <th scope="col">Status4</th>
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


              </div>
            </div>


            <div className="row">

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
export default Status4;
