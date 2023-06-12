import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, } from "reactstrap";
import { Block } from "../../../components/block/Block";
import { Button } from "../../../components/Component"
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
// import './Ticketss.css'
import AllOrders from "./All Orders";
import NewOrders from "./New Orders";

import PendingHandover from "./Pending Handover";
import Intransit from "./Intransit";
import Completed from "./Completed";
import PendingRTD from "./Pending Rtd";
import RTOIntransit from "./RTOIntransit";
import Lostawb from "./Lostawb";
// import axios from "axios";
// import { API_URL, token, API_Home_Page_Section, API_Order, API_Product } from "../../../Api";
// import { ToastContainer, toast } from "react-toastify";
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const OrdersList = ({ }) => {


  const [OrderData, setOrderData] = useState([]);
  const [NeworderData, setNewOrderData] = useState([]);

  const [activeIconTab, setActiveIconTab] = useState("1");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const selectTab = useCallback((count) => {
    setActiveIconTab(count);
  }, []);

  // useEffect(() => {
  //   AllOrder();
  //   // NewOrder();
  // }, [])

  // const AllOrder = async () => {
  //   const Result = await axios.get(`${API_Order}`, config);
  //   setOrderData(Result.data.list);
  // }

  // const NewOrder = async () => {
  //   let neworder_status = "New orders"
  //   let neworders = await axios.get(`${API_Order}/?order_status=${neworder_status}`, config);
  //   setNewOrderData(neworders.data.list);
  //   console.log("neworder",neworders.data.list)
  // }
  // console.log("OrderData",OrderData);
  return (
    <React.Fragment>
      <Head title="Profile" />
      <Content page="component">
        <Block size="lg">
          <PreviewCard>
            <Nav tabs >
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "1" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("1");
                  }}
                >
                  <span>All Orders</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "2" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("2");
                  }}
                >
                  <span>New Orders</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "3" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("3");
                  }}
                >
                  <span>Preparing</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "4" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("4");
                  }}
                >
                  <span>Ready to Handover</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "5" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("5");
                  }}
                >
                  <span>Shipped</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "6" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("6");
                  }}
                >
                  <span>Completed</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "7" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("7");
                  }}
                >
                  <span>RTO In-transit</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "8" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("8");
                  }}
                >
                  <span>Lost (AWB)</span>
                </NavLink>
              </NavItem>
            </Nav>
          </PreviewCard>
          <PreviewCard>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="1">
                <AllOrders order={OrderData} />
              </TabPane>
              <TabPane tabId="2">
                <NewOrders />
              </TabPane>
              <TabPane tabId="3">
                <PendingRTD />
              </TabPane>
              <TabPane tabId="4">
                <PendingHandover />
              </TabPane>
              <TabPane tabId="5">
                <Intransit />
              </TabPane>
              <TabPane tabId="6">
                <Completed />
              </TabPane>
              <TabPane tabId="7">
                <RTOIntransit />
              </TabPane>
              <TabPane tabId="8">
                <Lostawb />
              </TabPane>
            </TabContent>
          </PreviewCard>

        </Block>
      </Content>
    </React.Fragment>
  );
};

export default OrdersList;
