import React, { useEffect, Fragment, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import "./Profile.css";
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


import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { API_URL, token, API_Warehouse } from "../../../Api";
import { useCookies } from "react-cookie";

const API_Key = `${API_URL}/BasicInfo`;
const API_Vendor = `${API_URL}/admin/vendors`;
const API_Key_ware = `${API_URL}/admin/warehouse`;
const API_View = `${API_URL}/Maincategory_view`;
const API_View_Profile = `${API_URL}/Product_image`;
const API_Company = `${API_URL}/Companydetails`;
const API_Bank = `${API_URL}/Bank`;
const API_Ware = `${API_URL}/WareshouseVendor`;

const Overview = ({ getTab }) => {
  const [sm, updateSm] = useState(false);
  // const [token, settoken] = useState();
  const [cookies, setCookie] = useCookies();
  const [userDetail, setUserDetail] = useState({
    MobileNumber: "",
    CompanyName: "",
    Email: "",
    GST: "",
    Address: "",
    Ware: "",
    Logo: "",
    Store: "",
  });

  const [activeIconTab, setActiveIconTab] = useState("1");
  const [wareData, setwareData] = useState([]);

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  useEffect(() => {
    const TokenAccess = JSON.stringify(localStorage.getItem("accessToken"));
    // getVendorData();
    // settoken(TokenAccess._id)
    getData(cookies.vendor_id);
  }, []);

  const getData = async (ids) => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token} `,
        },
      };
      const datas = await axios.get(`${API_Vendor}/${ids}`, config);
      console.log(datas,"mmmmmmmmmmmm");
      if (datas) {

        const { business_registered_name, store_name,store_logo, gstin, email_address, phone_number, business_address } =
          datas.data.list[0];
        setUserDetail({
          ...userDetail,
          Logo: store_logo,
          Store: store_name,
          GST: gstin,
          Address: business_address,
          MobileNumber: phone_number,
          CompanyName: business_registered_name,
          Email: email_address,
          Ware: "",
        });
        // setUserDetail( {...userDetail,
        //   Logo: data.data[0]?.StoreLogo,
        //   Store: data.data[0]?.StoreName,
        //   GST: dataCmp.data[0]?.GSTIN,
        //   Address: dataCmp.data[0]?.Address,
        //   MobileNumber: datas.data?.PhoneNumber,
        //   CompanyName: datas.data?.CompanyName,
        //   Email: datas.data?.Email,
        //   Ware: dataWare.data?.FullName,
        // })
      }
      const waredata = await axios.get(`${API_Key_ware}/${ids}`, config);
      if (wareData) {

        setwareData(waredata.data.list)
      }





    } catch (error) {
      if (error.msg == "No data found") {
        // setwareData()
      }
    }
  };

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>
{/* {console.log(userDetail,"oooooooooooooo")} */}
        <Block>
          <Row>
            <Col md={4}>
              <Row>
                <Col md={12} className="text-center p-2">
                  <img
                    src={`${API_View_Profile}/${userDetail.Logo}`}
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4HPhCDx7WOqJfxuqh96TLbdaTUG024xXvw&usqp=CAU"
                    style={{ borderRadius: "50%", height: "150px", width: "150px", justifyContent: "center" }}
                  ></img> 
                  :
                  {/* {/*{userDetail.Logo ?
                  //  <img src={`${API_View}/${userDetail.Logo}`} style={{ borderRadius: '50%',height:'150px',width:'150px' ,justifyContent:'center'}}></img>
                  :
                  //  <img style={{ borderRadius: '50%',height:'150px',width:'150px' ,justifyContent:'center'}}></img>} */}
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
            </Col>
            <Col md={8} className="pt-2">
              <div className="row">
                <div className="col-md-12 dynami-details">
                  <div className="row ">
                    <div className="col-md-4">
                      <p class="font-weight-bold">Company Name
                        {/* <span className="float-right">:</span>  */}
                      </p>
                    </div>
                    <div className="col-md-8">
                      <p className="text-capitalize">{userDetail.CompanyName}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">GST No

                      </p>
                    </div>
                    <div className="col-md-8">
                      <p className="text-capitalize">{userDetail.GST}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">Email Address </p>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Email}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">Billing Address </p>
                    </div>
                    <div className="col-md-8">
                      <p className="text-capitalize">{userDetail.Address}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">Store Name </p>
                    </div>
                    <div className="col-md-8">
                      <p className="text-capitalize">{userDetail.Store}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">Mobile Number </p>
                    </div>
                    <div className="col-md-8">
                      <p className="text-capitalize">{userDetail.MobileNumber}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p className="font-weight-bold">Default Warehouse Address</p>
                    </div>



                    <div className="col-md-5">
                      <p className="text-capitalize">{wareData.map((item) => item.is_default_address === 1 ? item.warehouse_name + ',' : "No Warehouse")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4} className="mt-2">
              <Card>
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
                  </div> */}
            {/*  <div className="row ">
                    <div className="col-md-4">
                      <p>Store Name :</p>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Store}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p>Mobile Number :</p>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.MobileNumber}</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <p>Default Warehouse Address :</p>
                    </div>
                    <div className="col-md-8">
                      <p>{userDetail.Ware}</p>
                    </div>
                  </div>
                </div>
              </div>


            </Col>*/}
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
                <Icon name="alert-circle"  classNWarehouse Detailsame="mt-1"></Icon>
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
