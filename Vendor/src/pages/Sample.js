import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import ActiveUsers from "../components/partials/default/ActiveUsers";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import Sub from "../components/partials/default/Sub";
import Dcharts from "../pages/components/charts/Dcharts";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import LatestProducts from "../components/partials/default/recent-orders/RecentOrders";

import TopProducts from "../components/partials/default/top-products/TopProducts";
import Vendors from "../components/partials/default/top-products/Vendors";
import CustomerTop from "../components/partials/default/top-products/CustomerTop";

import AudienceOverview from "../components/partials/e-commerce/average-order/AudienceOverview";
import DataCard from "../components/partials/default/DataCard";
import AverageOrder from "../components/partials/e-commerce/average-order/AverageOrder";
import TrafficSources from "../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../components/partials/e-commerce/store-visitors/StoreVisitors";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
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
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import ActiveUser from "../components/partials/default/ActiveUsers";


const Sample = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              {/* <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle> */}
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 {sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                {/* <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div> */}
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs" >
            <Col xxl="3" sm="3" >
              <DataCard 
                title="MONTHLY  REVENUE"
                percentChange={"13"}
                up={true}
                // chart={<DefaultOrderChart />}
                amount={"1975"}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard
                title="LAST COMMISSION"
                percentChange={"19"}
                up={false}
                // chart={<DefaultRevenueChart />}
                amount={"293"}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard
                title="NEW VENDORS"
                percentChange={"23"}
                up={true}
                // chart={<DefaultCustomerChart />}
                amount={"847"}
              />
            </Col>
            <Col xxl="3" sm="3">
              <DataCard
                title=" TRIALING VENDORS "
                percentChange={"16"}
                up={true}
                // chart={<DefaultCustomerChart />}
                amount={"847"}
              />
            </Col>
            
            <Col xxl="6" md="6">
              <Sub />
            </Col>
          
            {/* <Col xxl="6" md="8" style={{color: "red"}}>
              <AudienceOverview />
            </Col> */}
            
            <Col xxl="6" md="8" lg="6">
              <Dcharts/>
            </Col>
            {/* <Col xxl="6" md="8" lg="6">
              <Vendors />
            </Col> */}
            
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Sample;
