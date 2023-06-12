import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { Badge, Button, FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Label } from "reactstrap";
import axios from "axios";
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
import { API_URL, token, API_Order } from "../../../Api";
import { NavLink, useHistory, useLocation } from "react-router-dom";
const API_Image = `${API_URL}/Product_image`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const Cardss = ({currEle,Warehouse,location}) => {
  const history = useHistory();
  const {EAN,HSN,ProductImage,ProductWeight,RegularPrice,SKU,SalePrice,Shipping_type,
    Suborder_id,Warehouse_id,babyamore_discount,babyamore_sale_amt,
    company_name,createDt,email_address,order_no,order_status,orders_id,
    productname,product_id,qty,id,saleprice,shipping_company,sub_total,total,
    transaction_id,user_id,user_ip,vendor_id,modifyDt,shippedDt,deliverDt,returnDt
    ,warehouse_name,vendor_sale_amt} = currEle;
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
          history.push("/dashboard/prods-list")
        });
  
  
    };


  return (
    <div>
<Card className="p-3">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <div className="shipdea">
                      <div className="row d-flex justify-content-between mb-2">
                        <div className="col-md-6">
                          <h6 className="d-inline">
                            <span className="font-weight-bold">Sub Order ID : </span>
                          </h6>
                          <NavLink to="/dashboard/orders-lists1">
                            <span style={{ fontSize: "15px", color: "" }}>{Suborder_id}</span>
                          </NavLink>
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
                        <div className="col-sm-3">
                         
                        </div>

                        {/* <div className="col-sm-4">
                      <Button size="sm" className="btn-dim" style={{ width: "82%", height: "100%" }} color="dark">Download Invoice &nbsp;<Icon name="arrow-to-down"></Icon></Button>
                    </div>
   */}
                      </div>

                      <div className="alert alert-success p-1 mt-2 mb-2">Delivered on {deliverDt}</div>
                    </div>

                    <div className="row p-0">
                      
                      <div className="col-md-6 mb-2">
                        <span class="d-block">
                          <span style={{ fontWeight: "bold" }}>Vendor :</span>
                          {company_name}
                        </span>
                        <span>
                          <span style={{ fontWeight: "bold" }}>Warehouses : </span>
                          {warehouse_name}
                        </span>
                      </div>
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
                            <span>Price : INR {SalePrice}</span>
                            <span>Sku : {SKU}</span>
                            <span>HSN Code: {HSN}</span>
                            <span>EAN: {EAN}</span>
                          </div>
                        </div>
                        <div className="gst-com pr-4 pt-3">
                          <span className="d-block">Total : ₹342.37</span>
                          <span className="d-block">18% GST : ₹61.63 </span>
                          <span className="d-block">12% GST : </span>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex mb-3">
                        <div className="mr-3">
                          <select
                            name=""
                            value={values?values: Warehouse_id}
                            onChange={(e)=>handleChangewarehouse(e)}
                            className="form-control form-select"
                            id="fv-topics"
                            disabled={order_status == "New orders"||order_status == "New Orders"  ? false : true}
                            placeholder="Select a option"
                            // style={{ width: "150px" }}
                          >
                            {Warehouse.length > 0 ? (
                              <>
                                {Warehouse.map((currEles) => {
                                  return (
                                    <>
                                      <option label={currEles.warehouse_name} value={currEles.warehouse_id}></option>
                                    </>
                                  );
                                })}
                              </>
                            ) : null}
                          </select>
                        </div>
                            
                        
                      </div>
                      <div className="col-md-4 mb-3">
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
                            ]}
                            value={isSPMethod}
                            onChange={handleChangeShip}
                          />
                         
                      </div>
                      <div className="col-md-4">
                              <span className="btn btn-danger p-1 mr-5" type="button" onClick={() => handleSubmits()}>
                                Submit
                              </span>
                            </div>

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
                  <div className="mx-4">
                          {/* <span className="btn btn-danger p-1 mr-5">Submit</span> */}
                          {/* <h6>Selected Warehouse : <span className="text-danger">{values}</span> </h6> */}
                        </div>
                </div>
              </Card>


    </div>
  )
}

export default Cardss