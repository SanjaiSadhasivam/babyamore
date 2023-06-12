import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import ActiveUsers from "../components/partials/default/ActiveUsers";
import Status from "../components/partials/default/CancelStatus";
import Histroy from "../components/partials/default/Histroy";
import Buttons from "../components/partials/default/Buttons"
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import LatestProducts from "../components/partials/default/recent-orders/RecentOrders";

import TopProducts from "../components/partials/default/top-products/TopProducts";
import Vendors from "../components/partials/default/top-products/Vendors";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import Accordian from "../pages/components/Accordions";


import CustomerTop from "../components/partials/default/top-products/CustomerTop";

import AudienceOverview from "../components/partials/e-commerce/average-order/AudienceOverview";
import OrderPages from "../components/partials/e-commerce/average-order/CancelOrderPages";
import DataCard from "../components/partials/default/DataCard";
import AverageOrder from "../components/partials/e-commerce/average-order/AverageOrder";
import TrafficSources from "../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../components/partials/e-commerce/store-visitors/StoreVisitors";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Collapse } from "reactstrap";
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
import Flush from "../components/partials/default/Flush";


const CancelList = () => {
  const [sm, updateSm] = useState(false);
  const [isOpen, setIsOpen] = useState("1");
  return (
    <React.Fragment>
      <Head title="Orders Details"></Head>
      <Content>

        <Block>
          <Row>
            <Col lg={8}>
              <Status />
            </Col>
            <Col lg={4}>
              <OrderPages />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default CancelList;
