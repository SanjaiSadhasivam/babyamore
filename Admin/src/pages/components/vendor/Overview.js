import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
// import SalesStatistics from "../components/partials/default/SalesStatistics";
// import ActiveUsers from "../components/partials/default/ActiveUsers";
// import Status from "../components/partials/default/Status";
// import Buttons from "../components/partials/default/Buttons"
// import OrderStatistics from "../components/partials/default/OrderStatistics";
// import StoreStatistics from "../components/partials/default/StoreStatistics";
// import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
// import LatestProducts from "../components/partials/default/recent-orders/RecentOrders";

// import TopProducts from "../components/partials/default/top-products/TopProducts";
// import Vendors from "../components/partials/default/top-products/Vendors";
// import GoogleMapPage from "../pages/components/misc/GoogleMap";
// import Accordian from "../pages/components/Accordions";

// import CustomerTop from "../components/partials/default/top-products/CustomerTop";

// import AudienceOverview from "../components/partials/e-commerce/average-order/AudienceOverview";
// import OrderPages from "../components/partials/e-commerce/average-order/OrderPages";
// import DataCard from "../components/partials/default/DataCard";
// import AverageOrder from "../components/partials/e-commerce/average-order/AverageOrder";
// import TrafficSources from "../components/partials/e-commerce/traffic-sources/TrafficSources";
// import StoreVisitors from "../components/partials/e-commerce/store-visitors/StoreVisitors";
// import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
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
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge } from "reactstrap";
import classnames from "classnames";
// import {
//   DefaultCustomerChart,
//   DefaultOrderChart,
//   DefaultRevenueChart,
//   DefaultVisitorChart,
// } from "../components/partials/charts/default/DefaultCharts";
// import ActiveUser from "../components/partials/default/ActiveUsers";
// import Flush from "../components/partials/default/Flush";

import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { API_URL, token } from "../../../Api";

const API_Key = `${API_URL}/BasicInfo`;
const API_Vendor = `${API_URL}/admin/vendors/status`;
const API_View = `${API_URL}/Maincategory_view`;
const API_Company = `${API_URL}/Companydetails`;
const API_Bank = `${API_URL}/Bank`;
const API_Ware = `${API_URL}/WareshouseVendor`;

const API_Over = `${API_URL}/admin/vendors`;

const API_Views = `${API_URL}/Product_image`;

const API_warehouse = `${API_URL}/admin/warehouse`;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Overview = ({ getTab }) => {
  const [sm, updateSm] = useState(false);
  const [token, settoken] = useState();

  const [sample, setSample] = useState([]);

  // console.log("sample",sample);
  const [warehouse, setWarehouse] = useState([]);

  const [userDetail, setUserDetail] = useState({
    MobileNumber: "",
    CompanyName: "",
    Email: "",
    GST: "",
    Address: "",
    Ware: "",
    Logo: "",
    isActive: false,
    Store: "",
  });

  const [activeIconTab, setActiveIconTab] = useState("1");

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  useEffect(() => {
    const ids = localStorage.getItem("MerchantView");
    settoken(ids);
    getData(ids);
    overView(ids);
    warehouseData(ids);
  }, []);

  const overView = async (id) => {
    const over = await axios.get(`${API_Over}/${id}`, config);
    // console.log("over",over);
    setSample(over.data.list);
    setUserDetail({
      Logo: over.data.list[0]?.store_logo,
    });
  };

  const warehouseData = async (id) => {
    const warehouse = await axios.get(`${API_warehouse}/${id}`, config);
    console.log(warehouse, "warehouse");
    setWarehouse(warehouse.data.list);
  };

  const getData = async (ids) => {
    const data = await axios.post(`${API_Key}/Vendorid`, { Vendorid: ids });
    const dataCmp = await axios.post(`${API_Company}/Vendorid`, { Vendorid: ids });
    // const dataBnk = await axios.post(`${API_Bank}/Vendorid`, { Vendorid: ids })
    const dataWare = await axios.get(`${API_Ware}/Vendor/${ids}`);
    const datas = await axios.get(`${API_Vendor}/${ids}`);
    setUserDetail({
      MobileNumber: datas.data?.PhoneNumber,
      CompanyName: datas.data?.CompanyName,
      Logo: data.data[0]?.StoreLogo,
      Email: datas.data?.Email,
      GST: dataCmp.data[0]?.GSTIN,
      Address: dataCmp.data[0]?.Address,
      Ware: dataWare.data?.FullName,
      Store: data.data[0]?.StoreName,
      isActive: datas.data?.isActive,
    });
  };

  const statusChange = async (val) => {
    
    var state = val === true ? 1 : 0;
    console.log(state,"yyyyyyyyy");
    const datas = await axios.put(`${API_Vendor}/${token}`, { isActive: state },config);
    if (datas) {
      getData(token);
    }
  };

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>

        <Block>
          <Row>
            <Col md={4}>
              {sample.map((items) => {
                return (
                  <>
                    <Card>
                      <Row>
                        <Col md={12} className="text-center p-2">
                          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4HPhCDx7WOqJfxuqh96TLbdaTUG024xXvw&usqp=CAU"style={{ borderRadius: '50%',height:'150px',width:'150px' ,justifyContent:'center'}}></img> */}
                          <img
                            src={`${API_Views}/${userDetail.Logo}`}
                            alt={items.store_name}
                            style={{ borderRadius: "50%", height: "150px", width: "150px", justifyContent: "center" }}
                          ></img>
                        </Col>
                      </Row>
                      {/* <CardFooter className="border-top  ">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 rating-section">


                        <ul className="list-unstyled ">
                          <li className="p-0 m-0"><span>0.0</span><small> Out of 5</small></li>
                          <li className="p-0 m-0"> <small>Overall rating</small></li>
                        </ul>
                      </div>
                      <div className="col-md-6 star">
                        <ul className="list-unstyled d-inline-flex f-16">
                          <li><Icon name="star"></Icon></li>
                          <li><Icon name="star"></Icon></li>
                          <li><Icon name="star"></Icon></li>
                          <li><Icon name="star"></Icon></li>
                          <li><Icon name="star"></Icon></li>
                        </ul>
                        <small>0 Ratings</small>
                      </div>
                    </div>
                  </div>
                </CardFooter> */}
                    </Card>
                  </>
                );
              })}
            </Col>

            <Col md={8} className="pt-2">
              {/*  <div className="row">
                <div className="col-md-12 dynami-details">

                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Company Name :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.CompanyName}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>GST No :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.GST}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Email Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Email}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Billing Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Address}</p>
                    </div>
                  </div>
                </div>
              </div>*/}

              {sample.map((values) => {
                let {
                  gstin,
                  email_address,
                  company_name,
                  phone_number,
                  store_name,
                  business_address,
                  vendor_name,
                  warehouse_name,
                } = values;
                console.log("values", values);
                return (
                  <div>
                    <div className="row">
                      <div className="col-md-12 dynami-details">
                        <div className="row ">
                          <div className="col-md-4">
                            <p className="font-weight-bold">GST No</p>
                          </div>
                          <div className="col-md-8">
                            <p className="text-capitalize">{gstin}</p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md-4">
                            <p className="font-weight-bold">Email Address</p>
                          </div>
                          <div className="col-md-8">
                            <p>{email_address}</p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md-4">
                            <p className="font-weight-bold">Billing Address</p>
                          </div>
                          <div className="col-md-8">
                            <p className="text-capitalize">{business_address}</p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md-4">
                            <p className="font-weight-bold">Store Name</p>
                          </div>
                          <div className="col-md-8">
                            <p className="text-capitalize">{store_name}</p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md-4">
                            <p className="font-weight-bold">Mobile Number</p>
                          </div>
                          <div className="col-md-8">
                            <p className="text-capitalize">{phone_number}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row">
                {/* <div className="col-md-4">
                  <p className="font-weight-bold">Default Warehouse Address</p>
                </div> */}
                <div className="col-md-4">
                  <p className="font-weight-bold">Default Warehouse Address</p>
                </div>

                <div className="col-md-5">
                  <p className="text-capitalize">
                    {warehouse.map((newData) => (newData.is_default_address === 1 ? newData.warehouse_name : ""))}
                  </p>
                </div>
                {/* );
                })} */}
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4} className="mt-2">
              <Card>
                <Row>
                  <Col md="12" sm="12">
                    <div className="preview-block">
                      <span className="preview-title overline-title">Vendor Status</span>
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          checked={userDetail.isActive}
                          id="customSwitch1"
                          name="isActive"
                          onChange={(e) => statusChange(e.target.checked)}
                        />
                        <label className="custom-control-label" htmlFor="customSwitch1">
                          Status
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row >
                  <Col md={12} className="text-center p-2 d-block">
                    <img src="https://portal.fabpik.in/public/seller/images/icons/approved.png" width={80} height={80} ></img><br></br>
                    <Badge className="badge-dim mt-2" color="success">Approved Date :
                      25 Jun 2021</Badge>
                  </Col>

                </Row> */}
                <Row>
                  <Col md={12}></Col>
                </Row>
              </Card>
            </Col>

            {/*   <Col md={8} className="pt-2">
              <div className="row">
                <div className="col-md-12 dynami-details">

                  {/* <div className="row ">
                    <div className="col-md-4">
                      <h6>PAN Card :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>Nazer Enterprise</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Store Name :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Store}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Mobile Number :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.MobileNumber}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Default Warehouse Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Ware}</p>
                    </div>
                  </div>
                </div>
              </div>


            </Col> */}
          </Row>
        </Block>
      </React.Fragment>
      {/* <Fragment>
        <Block>
          <Row className="container" style={{ marginLeft: '100px', marginRight: '100px' }}>
            <Col md={3} className="text-right">
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbarWithChildren value={100} className="CircularProgressbar-path">
                  <div style={{ fontSize: 16, marginTop: -5 }}>
                    <strong>100%</strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </Col>
            <Col md={6} className="text-left p-2">
              <p><b>Complete Your Profile</b></p>
              <small>You can’t submit your profile until all the mandatory data is completely filled.</small>
            </Col>
          </Row>
          <Row className="container mt-3 p-3">
            <Col md={1}>
            </Col>
            <Col md={2} className="p-2 ">
              <Card className="text-center" onClick={() => {
                getTab("2");
              }}>
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Basic Info</p>
                <p>65%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card className="text-center" onClick={() => {
                getTab("3");
              }}>
                <Icon name="alert-circle"  className="mt-1"></Icon>
                <p>Company Details</p>
                <p>55%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card className="text-center" onClick={() => {
                getTab("4");
              }}>
                <Icon name="alert-circle"  className="mt-1"></Icon>
                <p>Bank Details</p>
                <p>75%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card className="text-center" onClick={() => {
                getTab("5");
              }}>
                <Icon name="alert-circle"  className="mt-1"></Icon>
                <p>Order POC Details</p>
                <p>25%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card className="text-center" onClick={() => {
                getTab("6");
              }}>
                <Icon name="alert-circle"  className="mt-1"></Icon>
                <p>Warehouse Details</p>
                <p>85%</p>
              </Card>
            </Col>
            <Col md={1}>
            </Col>
          </Row>
        </Block>
      </Fragment> */}
    </div>
  );
};
export default Overview;
