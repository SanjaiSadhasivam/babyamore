import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import axios from "axios";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import ActiveUsers from "../components/partials/default/ActiveUsers";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import LatestProducts from "../components/partials/default/recent-orders/RecentOrders";

import TopProducts from "../pages/components/TopProducts";
import CustomerTop from "../components/partials/default/top-products/CustomerTop";

import AudienceOverview from "../components/partials/e-commerce/average-order/AudienceOverview";
import DataCard2 from "../components/partials/default/DataCard2";
import AverageOrder from "../components/partials/e-commerce/average-order/AverageOrder";
import TrafficSources from "../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../components/partials/e-commerce/store-visitors/StoreVisitors";
// import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Progress } from "reactstrap";
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
  PreviewCard,
  Knob2,
  RSelect
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import ActiveUser from "../components/partials/default/ActiveUsers";
import ProductStatistics from "../components/partials/default/top-products/ProductStatistics";
import ShippingList from "../components/partials/default/top-products/ShippingList";
import Recent from "../components/partials/default/top-products/Recent";
import Tickets from "../components/partials/default/top-products/Tickets";
import VendorDash from "./components/Vendors";
import DeliveryShipment from "./deliveryShipment";
import { translateRect } from "@fullcalendar/react";
import { useCookies } from "react-cookie";
import { API_URL,token ,API_Dashboard} from "../Api";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
const configss = {
  headers: {
    "Authorization": `Bearer ${token}`
  },
};

const API_Persentage = `${API_URL}/admin/vendors/datapercentage`;

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [percentage, setpercentage] = useState(null);
  const overviewKnob = {
    labels: ["", "", ""],
    dataUnit: "BTC",
    legend: false,
    datasets: [
      {
        borderColor: "transparent",
        backgroundColor: ["#fc8181"],
        data: [220, 80],
      },
    ],
  };
  const [dataa, setDataa] = useState({
    dailysale:"",
    monthlysale:"",
    neworders:"",
    outofstock:''
  });

  const data = {

    labels: ['Received wrong item', 'Received damaged', 'Received wrong size', 'Other'],
    datasets: [
      {
        // label: '# of Votes',
        label: 'My First Dataset',
        data: [12, 19, 13, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',

        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',

        // ],
        // borderWidth: 1,
        hoverOffset: 4,
        cutout: '80%'
      },
    ],
  };

const getPersentage = async()=>{
  let result = await axios.get(`${API_Persentage}/${cookies.vendor_id}`,configss);
  setpercentage(result.data.Result)
  console.log(result.data.Result,"result");
}



  useEffect(()=>{
    getPersentage()
    Getdata();

  },[])
  const Getdata = async () => {
    const Result = await axios.get(`${API_Dashboard}/${cookies.vendor_id}`, configss);
    const datas=Result.data.list
    setDataa({
      ...dataa,
      dailysale:datas.dailysale[0].dailysale,
      monthlysale:datas.monthlysale[0].TotalMonthlysale,
      neworders:datas.neworders[0].neworders, 
      outofstock:datas.outofstock[0].outofstock
    })
  };

  // Progress.propTypes = {
  //   multi: PropTypes.bool,
  //   bar: PropTypes.bool,
  //   tag: PropTypes.string,
  //   value: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]),
  //   max: PropTypes.oneOf([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]),
  //   animated: PropTypes.bool,
  //   striped: PropTypes.bool,
  //   color: PropTypes.string,
  //   className: PropTypes.string,
  //   barClassName: PropTypes.string 
  // };

  // Progress.defaultProps = {
  //   tag: 'progress',
  //   value: 0,
  //   max: 100,
  // };

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 {sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>

                      <div style={{ width: "200px" }}>
                        <RSelect
                          options={[
                            { value: "Last 30 days", label: "Last 30 days" },
                            { value: "Last 6 months", label: "Last 6 months" },
                            { value: "Last 3 weeks", label: "Last 3 weeks" },
                          ]}
                          // defaultInputValue="Last 30 days"
                          placeholder="Last 30 days"
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                    <li >


                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Row className="g-gs">
          <Col md="12">
            <Card>
              <h4 style={{paddingTop:"10px",paddingLeft:"18px",margin:"0px"}}>Profile</h4>
              <div className="fake-class">
                <Progress className="progress-lg" value={percentage}>
                  {percentage}%
                </Progress>
              </div>
            </Card>
          </Col>

          <Col lg='6'>
            <Card className="p-2">
              <Doughnut data={data}
              />
            </Card>
          </Col>
          <Col lg="6">
            <Card className="px-3 py-4">
              <div>
                <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>Payments</p>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>Next Payment</p>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>Due On Aug 24, 2022</p>
                </div>
                <div>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>₹ 323.31</p>
                </div>
              </div>
              <hr></hr>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>Prepard</p>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>Postpaid/TDS</p>
                </div>
                <div>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>₹ 0</p>
                  <p className="p-0 m-0" style={{ fontSize: "16.5px" }}>₹ 313.31</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg="12">
            <Row>
              <Col lg='3' >
                <DataCard2
                  className="p-2"
                  title="MONTHLY SALES"
                  percentChange={"13"}
                  up={true}
                  // chart={<DefaultOrderChart />}
                  amount={<a a href={`${process.env.PUBLIC_URL}/prods-list`}> {dataa.monthlysale}</a>}
                />
              </Col>
              <Col lg='3'>
                <DataCard2
                  title="DAILY SALES"
                  percentChange={"23"}
                  up={true}
                  // chart={<DefaultCustomerChart />}
                  amount={< a href={`${process.env.PUBLIC_URL}/prods-list`}> {dataa.dailysale}</a>}
                />
              </Col>
              <Col lg='3'>
                <DataCard2
                  title="NEW ORDERS"
                  percentChange={"23"}
                  up={true}
                  // chart={<DefaultCustomerChart />}
                  amount={< a href={`${process.env.PUBLIC_URL}/prods-list`}> {dataa.neworders}</a>}
                />
              </Col>
              <Col lg='3'>
                <DataCard2
                  title="LOW STOCK PRODUCTS"
                  percentChange={"23"}
                  up={true}
                  // chart={<DefaultCustomerChart />}
                  amount={< a href={`${process.env.PUBLIC_URL}/product_list`}>  {dataa.outofstock}</a>}
                  // style={{ padding: '10px' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <DeliveryShipment />
    </React.Fragment>
  );
};
export default Homepage;
