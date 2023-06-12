import React, { Fragment, useState , useEffect} from "react";
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
  RSelect
} from "../../../components/Component";
import { Card, CardHeader, CardFooter, Badge } from "reactstrap";
import classnames from "classnames";


import User1 from "../../../images/avatar/a-sm.jpg";
import "./Profile.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { API_URL, API_Banner, token } from "../../../Api";
const API_View = `${API_URL}/Admin_Staff`;
const API_STAFF = `${API_URL}/admin/users`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Overview = ({ getTab }) => {
  const [sm, updateSm] = useState(false);
  const [activeIconTab, setActiveIconTab] = useState("1");
  const [staffData, setStaffData] = useState();

  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    // let Result = await axios.get(`${API_STAFF}`, config);
    // console.log("resultt", Result.data.list);
    // setStaffData(Result.data.list);
  }

  return (
    <div>
      <React.Fragment>
        <Head title="Overview"></Head>

        <Block>
          <Row>
            <Col md={4}>
              <Card>
                <Row>
                  <Col md={12} className="text-center p-2">
                    <img src={User1} style={{ borderRadius: "50%" }}></img>
                  </Col>
                </Row>
                <CardFooter className="border-top  ">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 rating-section">
                        <ul className="list-unstyled ">
                          <li className="p-0 m-0">
                            <span>0.0</span>
                            <small> Out of 5</small>
                          </li>
                          <li className="p-0 m-0">
                            {" "}
                            <small>Overall rating</small>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 star">
                        <ul className="list-unstyled d-inline-flex f-16">
                          <li>
                            <Icon name="star"></Icon>
                          </li>
                          <li>
                            <Icon name="star"></Icon>
                          </li>
                          <li>
                            <Icon name="star"></Icon>
                          </li>
                          <li>
                            <Icon name="star"></Icon>
                          </li>
                          <li>
                            <Icon name="star"></Icon>
                          </li>
                        </ul>
                        <small>0 Ratings</small>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md={8} className="pt-2">
              <div className="row">
                <div className="col-md-12 dynami-details">
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Company Name :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>Nazer Enterprise</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>GST No :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>33AJQPN5792F1ZR</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Email Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>imthad@gmail.com</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Billing Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>
                        Office No 2B, Apex Plaza 2nd Floor, No 3 Uthamar Gandhi Salai, Nungambakkam, Chennai - 600034,
                        Chennai, Tamil Nadu, 600034
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={4} className="mt-2">
              <Card>
                <Row>
                  <Col md={12} className="text-center p-2 d-block">
                    <img
                      src="https://portal.fabpik.in/public/seller/images/icons/approved.png"
                      width={80}
                      height={80}
                    ></img>
                    <br></br>
                    <Badge className="badge-dim mt-2" color="success">
                      Approved Date : 25 Jun 2021
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}></Col>
                </Row>
              </Card>
            </Col>

            <Col md={8} className="pt-2">
              <div className="row">
                <div className="col-md-12 dynami-details">
                  <div className="row ">
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
                      <p>Nazer Enterprise</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Mobile Number :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>9790583438</p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <h6>Default Warehouse Address :</h6>
                    </div>
                    <div className="col-md-8">
                      <p>
                        Office No 2B, Apex Plaza 2nd Floor, No 3 Uthamar Gandhi Salai, Nungambakkam, Chennai - 600034,
                        Chennai, Tamil Nadu, 600034
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Block>
      </React.Fragment>
      <Fragment>
        <Block>
          <Row className="container" style={{ marginLeft: "100px", marginRight: "100px" }}>
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
              <p>
                <b>Complete Your Profile</b>
              </p>
              <small>You can’t submit your profile until all the mandatory data is completely filled.</small>
            </Col>
          </Row>
          <Row className="container mt-3 p-3">
            <Col md={1}></Col>
            <Col md={2} className="p-2 ">
              <Card
                className="text-center"
                onClick={() => {
                  getTab("2");
                }}
              >
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Basic Info</p>
                <p>65%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card
                className="text-center"
                onClick={() => {
                  getTab("3");
                }}
              >
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Company Details</p>
                <p>55%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card
                className="text-center"
                onClick={() => {
                  getTab("4");
                }}
              >
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Bank Details</p>
                <p>75%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card
                className="text-center"
                onClick={() => {
                  getTab("5");
                }}
              >
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Order POC Details</p>
                <p>25%</p>
              </Card>
            </Col>
            <Col md={2} className="p-2">
              <Card
                className="text-center"
                onClick={() => {
                  getTab("6");
                }}
              >
                <Icon name="alert-circle" className="mt-1"></Icon>
                <p>Warehouse Details</p>
                <p>85%</p>
              </Card>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Block>
      </Fragment>
    </div>
  );
};
export default Overview;
