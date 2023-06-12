import React, { useEffect, useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import ActiveUsers from "../components/partials/default/ActiveUsers";
import Status from "../components/partials/default/Status";
// import Histroy from "../components/partials/default/Histroy";
import Buttons from "../components/partials/default/Buttons";
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
import { useLocation } from "react-router";
import axios from "axios";
import { API_URL, token, API_Order } from "../Api";
// import Invoice from "../components/partials/default/Invoice";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const OrdersList1 = () => {
  const location = useLocation().state;

  const [sm, updateSm] = useState(false);
  const [isOpen, setIsOpen] = useState("1");
  const [orderData, setOrderData] = useState([]);
  const [Infotable, setInfotable] = useState([]);
  const [sub, setSub] = useState(0);
  const Getdata = async () => {
    const Result = await axios.get(`${API_Order}/?id=${location}`, config);
    setOrderData(Result.data.list);
    if(Result.data.list.length>0){;
      let result = Result.data.list
      let newData = result.map((element, index) => {
        return [
          index + 1,
          // element.invoice_number,
          `${element.productname} \n\n WubbaNub Animals : Dragon \n HSN Code : 40149030 \n EAN : 719771226631 \n\n SKU : WUB_011
        `,
          element.qty,
          element.saleprice,
          element.sub_total,
         ];
       });

         setInfotable(newData);
         let sub_total = result.reduce((intial, element) => {
           let intials = intial + Number(element.sub_total);
           return intials;
         }, 0);
   
         setSub(sub_total);
    }

  };

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <React.Fragment>
      <Head title="Orders Details"></Head>
      <Content>
        <Block>
          {/* <div>
          <Invoice/>
          </div> */}
          <Row>
            <Col lg={8}>
              <Status orderData={orderData} ID={location} Infotable={Infotable} sub={sub}/>
            </Col>
            <Col lg={4}>
              <OrderPages orderData={orderData}/>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default OrdersList1;
