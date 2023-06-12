import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import ActiveUsers from "../components/partials/default/ActiveUsers";
import Status from "../components/partials/default/Status";
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
import OrderPages from "../components/partials/e-commerce/average-order/OrderPages";
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
import Invoice from "../components/partials/default/Invoice";
import Status2 from "../components/partials/default/Status2";
import SubOrderPage from "../components/partials/e-commerce/average-order/SubOrderPage";
import { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { API_URL, token, API_Order } from "../Api";
const vendorWarehouse = `${API_URL}/admin/warehouse`;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const API_SUB_ORDER = `${API_URL}/admin`;
const OrdersList2 = () => {
  const [sm, updateSm] = useState(false);
  const [smOption, setSmOption] = useState([]);
  const [Warehouse, setWarehouse] = useState([]);
  const [isOpen, setIsOpen] = useState("1");
  const location = useLocation().state;


const getVendor = async(id)=>{
 let res = await axios.get(`${vendorWarehouse}/${id}`,config);
 if(res.data.list.length>0){

  setWarehouse(res.data.list);
 }
}






  const getSubOrder = async () => {
    let result = await axios.get(`${API_SUB_ORDER}/billing?id=${location.order_no}&subid=${location.Suborder_id}`);
    if (result.data.list.length > 0) {
      let data = result.data.list;
      setSmOption(result.data.list);
      let vendor_id = data[0].vendor_id;
      if(vendor_id){

        getVendor(vendor_id);
      }
    }
  };
  useEffect(() => {
    getSubOrder();
  }, []);
  return (
    <React.Fragment>
      <Head title="Orders Details"></Head>
      <Content>
        <Block>
          <Row>
            <Col lg={8}>
              <Status2  smOption={smOption} location={location} Warehouse={Warehouse}/>
            </Col>
            <Col lg={4}>
              <SubOrderPage smOption={smOption}/>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default OrdersList2;
