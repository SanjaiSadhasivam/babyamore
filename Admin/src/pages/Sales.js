import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SaleRevenue from "../components/partials/sales/sale-revenue/SaleRevenue";
import ActiveSubscription from "../components/partials/sales/active-subscription/ActiveSubscription";
import AvgSubscription from "../components/partials/sales/avg-subscription/AvgSubscription";
import SalesOverview from "../components/partials/sales/sales-overview/SalesOverview";
import TransactionTable from "../components/partials/sales/transaction/Transaction";
import TransactionTable1 from '../components/partials/sales/transaction/Trans';
import Prod2Lists from "../pages/components/table/Prod2Lists"; 

import RecentActivity from "../components/partials/sales/recent-activity/Activity";
import NewsUsers from "../components/partials/sales/new-users/User";
import Support from "../components/partials/sales/support-request/Support";
import Notifications from "../components/partials/sales/notification/Notification";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  PreviewAltCard,
  Icon,
  Button,
  Row,
  Col,
} from "../components/Component";

const SalesHome = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Overall Order & Sales Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
              Overall Order & Sales Dashboard
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-white btn-dim btn-outline-light">
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
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="6">
              <Row className="g-gs">
                <Col lg="12" xxl="12">
                  <PreviewAltCard>
                    <SaleRevenue />
                  </PreviewAltCard>
                </Col>
               
              </Row>
            </Col>
           
            <Col xxl="8">
              <Card className="card-full">
                <Prod2Lists />
              </Card>
            </Col>
           
            
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default SalesHome;
