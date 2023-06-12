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
import { NavLink, useHistory, useLocation } from "react-router-dom";
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
import logo from '../../../assets/images/jsTree/Baby-Logo.png';
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL, token, API_Order } from "../../../Api";

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_Image = `${API_URL}/Product_image`;
const Status = () => {
  //model for assign delevery boy
  const [Infotable, setInfotable] = useState("");
  const [sub,setSub]=useState(0)
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
  const location = useLocation();
  const ID = location.state;

  const [smOption, setSmOption] = useState(false);
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const { errors, register, handleSubmit } = useForm();
  useEffect(() => {
    Getdata();
  }, []);
  const [OrderData, setOrderData] = useState("");
  const Getdata = async () => {
    const Result = await axios.get(`${API_Order}/?id=${ID}`, config);
    setOrderData(Result.data.list);
    let newData = Result.data.list.map((element, index) => {
      return [
        index + 1,
        // element.invoice_number,
        `${element.productname} \n\n WubbaNub Animals : Dragon ${element.HSN?"\n HSN Code : "+element.HSN:null} ${element.EAN?"\n EAN : "+element.EAN:null} ${element.SKU?"\n\n SKU : "+element.SKU:null}
        `,
        element.qty,
        element.saleprice,
        element.sub_total,
      ];
    });
    setInfotable(newData);
    let sub_total = Result.data.list.reduce((intial,element) => {
      let intials = intial+Number(element.sub_total);
      return intials;
    },0);
   
    setSub(sub_total);
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
  const history = useHistory();
  const handleChangeShip = async (event) => {
    setIsSPMethod(event);
    let formData = new FormData();
    formData.append("status", event.value);
    await axios.put(`${API_Order}/${ID}`, formData, config).then((res) => {});
  };
  var loopinc = 0;





  const download = async () => {
    const Result = await axios.get(`${API_Order}/exportinvoice/${ID}`, config);
    const invoice = Result.data.list;

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
                `${OrderData[0].full_name}`+
                `\n${OrderData[0].Billingaddress}`,
              styles: {
                halign: "left",
                overflow:"linebreak",
                // font: 'helvetica',
                valign:"middle"   
              },
              
            
              
            },
            {
                      content:
                        `Order Number: ${OrderData[0].order_no}` +
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
     
      return doc.save(`${OrderData[0].order_no}`);
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
           
  //           {
  //             content:
  //               `Order ID: ${OrderData[0].order_no}` +
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
  //             content:
  //               `Billing Address:` +
  //               "\n" +
  //               `\n${OrderData[0].full_name}` +
  //               `\n${OrderData[0].Billingaddress}`,
  //             styles: {
  //               halign: "left",
  //             },
  //           },
  //           {
  //             content:
  //               "Shipping Address:" +
  //               "\n" +
  //               `\n${OrderData[0].full_name}` +
  //               `\n${OrderData[0].shippingaddress}`,
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
  //     return doc.save(`${OrderData[0].order_no}`);
  //   }
  // };




const handleView = (dataone,datatwo)=>{
  const id={
    "order_no":datatwo,
    "Suborder_id":dataone
}
  history.push({pathname: "/dashboard/orders-lists1",state:id});
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
                    Order ID: <b>{OrderData[0].order_no}</b>
                  </h5>
                  <h6>
                    Order Date: <b>{OrderData[0].createDt.slice(0, 10)}</b>
                  </h6>
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-md-6 p-3">
                <h5>Payment: Credit</h5>
                Transaction id : {OrderData[0].transaction_id} <br />
                Customer IP : {OrderData[0].user_ip}
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
        <div className="card-title-group my-3">
          <div className="card-header w-100">
            <h5 className="title">Order details</h5>
          </div>
        </div>

        {OrderData.length > 0 &&
          OrderData.map((data) => {
            // loopinc++;
            return (
              <>
                <Card className="p-3">
                  <div className="row mb-5">
                    <div className="col-md-12">
                      <div className="shipdea">
                        <div className="row d-flex justify-content-between mb-2">
                          <div className="col-md-
                          6">
                            <h6 className="d-inline ml-2">
                              <span className="font-weight-bold">Sub Order ID :    <span style={{ fontSize: "15px", color: "rgb(252, 129, 129)" ,cursor:"pointer"}} onClick={()=>handleView(data.Suborder_id,data.order_no)}>{data.Suborder_id}</span></span>
                            </h6>
                           
                          </div>
                        </div>

                        <div className="row d-flex justify-content-between"></div>

                        <div className="alert alert-success p-1 mt-2 mb-2">Delivered on Tue, Sep 28</div>
                      </div>

                      <div className="row p-0">
                        <div className="col-md-6 mb-2">
                          <span class="d-block">
                            <span style={{ fontWeight: "bold" }}>Vendor :</span>
                            {data.company_name}
                          </span>
                          <span>
                            <span style={{ fontWeight: "bold" }}>Warehouses : </span>
                            {data.warehouse_name}
                          </span>
                        </div>
                        <div className="col-md-12 d-flex justify-content-between mb-2">
                          <div className="prod-com d-flex ">
                            <div className="images1">
                              <img
                                src={`${API_Image}/${data.ProductImage}`} className="border mr-2"
                                style={{ width: "100px",height:"100px"}}
                              />
                            </div>

                            <div>
                              <h5 className="mb-1 fs-6">Product:{data.productname?data.productname.substring(0,20):null}...</h5>
                              <span>Quantity : {data.qty} </span>
                              <span>Price : INR {data.SalePrice}</span>
                              <span>Sku : {data.SKU}</span>
                              <span>HSN Code: {data.HSN}</span>
                              <span>EAN: {data.EAN}</span>
                            </div>
                          </div>
                          <div className="gst-com pr-4 pt-3">
                            <span className="d-block">Total : {data.SalePrice}</span>
                            <span className="d-block">18% GST : </span>
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
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            );
          })}

        <div>
          <hr />
        </div>
        {/*
        <div>
          <hr />
        </div> */}

        {/* <div className="row d-none">

          <div className="col-md-12" style={{ overflow: "scroll" }}>
           <Invoice />
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
                  <th scope="col">STATUS</th>
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
        </div> */}
        {OrderData ? (
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
                        <span className="ml-2">INR {OrderData[0].sub_total}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Discount </span>{" "}
                      </th>
                      <td>
                        <span>INR {OrderData[0].total_discount}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Shipping</span> <br></br>
                      </th>
                      <td>
                        <span>INR {OrderData[0].shipping}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Packaging</span>
                      </th>
                      <td>
                        <span>INR {OrderData[0].packaging}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>Handling</span>
                      </th>
                      <td>
                        <span>INR {OrderData[0].handling}</span>
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
                        <span>INR {OrderData[0].tax}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <p>Order total</p>
                      </th>
                      <td>
                        <p>INR {OrderData[0].total}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};
export default Status;
