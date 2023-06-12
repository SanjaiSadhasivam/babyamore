import React,{useState} from 'react';
import { Card } from "reactstrap";
import axios from "axios";
import { API_URL, API_Order, token } from "../../../Api";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label } from "reactstrap";
import diapers from "../../../assets/images/jsTree/diapers.jpg";
import nappycleaning from "../../../assets/images/jsTree/nappycleaning.jpg";
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
import { useHistory } from 'react-router';
const API_Image = `${API_URL}/Product_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Cards = ({ currElement, location, Warehouse }) => {
const {EAN,HSN,ProductImage,ProductWeight,RegularPrice,SKU,SalePrice,Shipping_type,
  Suborder_id,Warehouse_id,babyamore_discount,babyamore_sale_amt,company_name,createDt,
  email_address,order_no,order_status,orders_id,productname,product_id,qty,id,saleprice,
  shipping_company,sub_total,total,transaction_id,user_id,user_ip,vendor_id,modifyDt,shippedDt,deliverDt,returnDt
,warehouse_name,vendor_sale_amt} = currElement;

const history = useHistory();
  const [values, setValues] = useState(Warehouse_id);
  const [isSPMethod, setIsSPMethod] = useState({ value: order_status, label: order_status });









  const handleChangewarehouse = async (e) => {
    setValues(e.target.value);
  };
  const handleChangeShip = async (event) => {
    setIsSPMethod(event);

    // const datas = await axios.put(`${API_Vendor}/${token}`, { isActive: state },config);
    // if (datas) {
    //   getData(token);
    // }
  };

  
  const handleSubmits = async () => {
    if(order_status=="New orders"||order_status=="New Orders"){
      let formData = new FormData();
      formData.append("Warehouse_id", values);
      await axios
        .put(`${API_Order}/wareupdate/${location.order_no}/${location.Suborder_id}/${product_id}`, formData, config)
        .then((res) => {
          // setResMsg(res.data.msg, "resss");
        });
    }
    
    let formDatas = new FormData();
    formDatas.append("status", isSPMethod.value);
    await axios
      .put(`${API_Order}/status/${id}`, formDatas, config)
      .then((res) => {
        // setResMsg(res.data.msg, "resss");
        history.push("/dashboard/order-data")
      });


  };
  return (
    <div>
        <Card>
          <div className="card-inner">
            <div className="card-title-group mb-2">
              <div className="card-header w-100 mb-1">
                <h5 className="title">Order details</h5>
              </div>
            </div>

            {/*order start*/}

           
                    <>
                      <div className="row mb-5">
                        <div className="col-md-12">
                          <div className="shipdea">
                            <div className="row d-flex justify-content-between mb-2">
                              <div className="col-md-6">
                                {/* <h6>Order id : #BA001_01</h6> */}
                                <span class="d-block">Sub Order ID: {Suborder_id}</span>
                                <span class="d-block">Vendor : {company_name}</span>

                                <span>Warehouses : {warehouse_name}</span>
                                <span class="d-block mt-2 mb-1">
                                  <img
                                    className="imgcour"
                                    src="https://uploads-ssl.webflow.com/5ef27cb65411b70949a151e9/5f17078fcfae300fc5b3d69c_download%20(16).png"
                                  />
                                </span>
                              </div>

                              <div className="col-md-6 hh-grayBox pt45 pb20">
                                  {
                                    order_status == "Cancel" ?
                                    <>
                                     <div className="row">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            order_status == "Shipped" ||
                                            order_status == "Completed" ||
                                            order_status == 
                                              "RTO In-transit" ||order_status == "Cancel" || order_status == "Lost (AWB)"||order_status=="Return"||order_status=="Returned" || order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Cancelled
                                            <br />
                                            <span>{  order_status == "Cancel"? new Date(modifyDt).toLocaleDateString():modifyDt==null?null:new Date(modifyDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                       
                                       
                                      </div>
                                    
                                    </>:null
                                  }

                                  {
                                    order_status == "Cancelled" ||order_status == "Request For Cancel"?
                                    <>
                                      <div className="row justify-content-between">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            order_status == "Shipped" ||
                                            order_status == "Completed" ||
                                            order_status == 
                                              "RTO In-transit" ||order_status == "Request For Cancelled" || order_status == "Lost (AWB)"||order_status=="Return"||order_status=="Returned" || order_status=="Refunded" ||order_status=="Request For Cancel"
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Shipped
                                            <br />
                                            <span>{  order_status == "Request For Cancel"? new Date(shippedDt).toLocaleDateString():shippedDt==null?null:new Date(shippedDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            order_status == "Cancelled" || order_status =="Request For Cancel" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            {order_status == "Cancelled"?"Cancelled":order_status=="Request For Cancel"?"Request For Cancel":null}
                                            <br />
                                            <span>{new Date(modifyDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                       
                                      </div>
                                    
                                    </>:null
                                  }
                                  {order_status == "Cancel"||order_status == "Cancelled" ||order_status == "Request For Cancel" ? (
                                    <>
                                    {null}
                                    </>
                                  ) : (
                                    <>
                                      <div className="row justify-content-between">
                                        <div
                                          className={"order-tracking completed"}
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Ordered
                                            <br />
                                            <span>{new Date(createDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            order_status == "Shipped" ||
                                            order_status == "Completed" ||
                                            order_status == 
                                              "RTO In-transit" ||order_status == "Request For Cancel" || order_status == "Lost (AWB)"||order_status=="Return"||order_status=="Returned" || order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            Shipped
                                            <br />
                                            <span>{  order_status == "Shipped"? new Date(shippedDt).toLocaleDateString():shippedDt==null?null:new Date(shippedDt).toLocaleDateString()}</span>
                                          </p>
                                        </div>
                                        <div
                                          className={
                                            order_status == "Completed"||order_status=="Return"||order_status=="Returned" || order_status=="Refunded" 
                                              ? "order-tracking completed"
                                              : "order-tracking"
                                          }
                                        >
                                          <span className="is-complete" />
                                          <p>
                                            {order_status == "Completed"?"Delivered":order_status=="Return"?"Return":order_status=="Returned"?"Returned":order_status=="Refunded"?"Refunded":"Delivered"}
                                            <br />
                                            <span>{order_status == "Completed"?new Date(deliverDt).toLocaleDateString():order_status=="Return"?null:order_status=="Returned"?new Date(returnDt).toLocaleDateString():order_status=="Refunded"?new Date(modifyDt).toLocaleDateString():null}</span>
                                          </p>
                                        </div>
                                       
                                      </div>
                                    </>
                                  )}
                                  {/* {order_status == "Return"?  <div className="text-center text-success mt-3">
                                        <h5>Your Return Request Submited Successfully</h5>
                                      </div>:null}
                                  {order_status == "Returned"?  <div className="text-center text-success mt-3">
                                        <h5>Your Order is Returned</h5>
                                      </div>:null}
                                  {order_status == "Refunded"?  <div className="text-center text-success mt-3">
                                        <h5>Your Order is Refunded</h5>
                                      </div>:null}
                                  {order_status == "Request For Cancel"?  <div className="text-center text-success mt-3">
                                        <h5>Your Cancel Request is Submited Successfully</h5>
                                      </div>:null} */}
                                </div>
                            </div>

                            <div className="row d-flex justify-content-between">
                              <div className="col-sm-2">
                                <span className="btn btn-success fw-normal fs-6 p-1 mr-2">Delivered</span>
                              </div>
                              <div className="col-sm-3">
                                <span className="btn btn-outline-success fw-normal p-1">Track Shipment</span>
                              </div>
                              <div className="col-sm-3"></div>

                              {/* <div className="col-sm-4">
                      <Button size="sm" className="btn-dim" style={{ width: "82%", height: "100%" }} color="dark">
                        Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon>
                      </Button>
                    </div> */}
                            </div>

                            <div className="alert alert-success p-1 mt-2 mb-2">Delivered on {deliverDt}</div>
                          </div>

                          <div className="row p-0">
                            <div className="col-md-12 d-flex justify-content-between mb-2">
                              <div className="prod-com d-flex ">
                                <div className="images1">
                                  <img
                                    src={`${API_Image}/${ProductImage}`}
                                    className="border-radius-50 imagprod border mr-2"
                                  ></img>
                                </div>

                                <div>
                                  <h5 className="mb-1 fs-6">{productname?productname.substring(0,20):null}...</h5>
                                  <h6 className="mb-1 fs-6">Quantity : {qty}</h6>
                                  <span>Price : INR {saleprice}</span>
                                  <span>Sku : {SKU}</span>
                                  <span>HSN Code: {HSN}</span>
                                  <span>EAN: {EAN}</span>
                                </div>
                              </div>
                              <div className="gst-com pr-4 pt-3">
                                <span className="d-block">Total : ₹{total}</span>
                                <span className="d-block">18% GST : ₹61.63 </span>
                                <span className="d-block">12% GST : </span>
                              </div>
                            </div>

                            <div className="col-md-4  mb-3">
                              <div className="">
                                <select
                                  name=""
                                  value={values ? values : Warehouse_id}
                                  onChange={(e) => handleChangewarehouse(e)}
                                  className="form-control form-select"
                                  id="fv-topics"
                                  disabled={order_status == "New orders"||order_status == "New Orders"  ? false : true}
                                  placeholder="Select a option"
                                  // style={{ width: "150px" }}
                                >
                                  {Warehouse.length > 0 ? (
                                    <>
                                      {Warehouse.map((currEle) => {
                                        return (
                                          <>
                                            <option
                                              label={currEle.warehouse_name}
                                              value={currEle.warehouse_id}
                                            ></option>
                                          </>
                                        );
                                      })}
                                    </>
                                  ) : null}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="">
                                <RSelect
                                  options={[
                                    { value: "New orders", label: "New orders" },
                                    { value: "Preparing", label: "Preparing" },
                                    { value: "Ready to Handover", label: "Ready to Handover" },
                                    { value: "Shipped", label: "Shipped" },
                                    { value: "Completed", label: "Completed" },
                                    { value: "RTO In-transit", label: "RTO In-transit" },
                                    { value: "Returned", label: "Returned" },
                                    { value: "Refunded", label: "Refunded" },
                                    // { value: "Partially refunded", label: "Partially refunded" },
                                    { value: "Lost (AWB)", label: "Lost (AWB)" },
                                    { value: "Cancelled", label: "Cancelled" },
                                    // { value: "Upcoming orders", label: "Upcoming orders" },
                                  ]}
                                  value={isSPMethod}
                                  onChange={(e) => handleChangeShip(e)}
                                />
                              </div>
                            </div>
                            <div>
                              <span className="btn btn-danger p-1 mr-5" type="button" onClick={() => handleSubmits()}>
                                Submit
                              </span>
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
                    </>
                

            <div>
              <hr />
            </div>

            <div>
              {/* <hr /> */}
            </div>
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
                      <td>
                        <Badge color="primary">Delivered</Badge>{" "}
                      </td>
                      <td>INR 1400</td>
                    </tr>
                    <tr>
                      <th>
                        <img
                          src={diapers}
                          className="border-radius-50"
                          style={{ borderRadius: "50%", width: "50%", height: "50%" }}
                        ></img>
                      </th>
                      <td>Diapers & Pants</td>
                      <td>PM-010</td>
                      <td>123567891-PM</td>
                      <td> kumar</td>
                      <td>Aug 2022</td>
                      <td>sm -6 nos</td>
                      <td>1</td>
                      <td>vadapalani</td>
                      <td>INR 1400</td>
                      <td>INR 1340</td>
                      <td>INR 150</td>
                      <td> BA-004</td>
                      <td>
                        <Badge color="primary">Shipping</Badge>{" "}
                      </td>
                      <td>INR 770.53</td>
                    </tr>
                    <tr>
                      <th>
                        <img
                          src={nappycleaning}
                          className="border-radius-50"
                          style={{ borderRadius: "50%", width: "50%", height: "50%" }}
                        ></img>
                      </th>
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

                      <td> BA-005 </td>
                      <td>
                        <Badge color="primary">Delivered</Badge>{" "}
                      </td>
                      <td>INR 770.53</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            
          </div>
        </Card>  
    </div>
  )
}

export default Cards