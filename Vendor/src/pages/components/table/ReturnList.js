import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";
import { useCookies } from 'react-cookie'
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, } from "reactstrap";
import { Block } from "../../../components/block/Block";
import { Button } from "../../../components/Component"
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import AllOrders from "./All Orders";
import NewOrders from "./New Orders";
import ReturnList from "./ReturnListData";
import ReturnedListData from "./ReturnedListData.js";
// import './Ticketss.css'
// import AllOrders from "./All Orders";
// import NewOrders from "./New Orders";

// import PendingHandover from "./Pending Handover";
// import Intransit from "./Intransit";
// import PendingRTD from "./Pending Rtd";
// import axios from "axios";
// import { API_URL, token, API_Home_Page_Section, API_Order, API_Product } from "../../../Api";
// import { ToastContainer, toast } from "react-toastify";
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

const OrdersLists = ({ }) => {


  const [OrderData, setOrderData] = useState([]);
  const [NeworderData, setNewOrderData] = useState([]);

  const [activeIconTab, setActiveIconTab] = useState("1");
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const [cookies, setCookie, removeCookie] = useCookies();

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
                  <span>RETURN LIST</span>
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
                  <span>RETURNED LIST</span>
                </NavLink>
              </NavItem>

            </Nav>
          </PreviewCard>
          <PreviewCard>
            <TabContent activeTab={activeIconTab}>
              <TabPane tabId="1">
                {/* <AllOrders order={OrderData} /> */}
                <ReturnList />
              </TabPane>
              <TabPane tabId="2">
                <ReturnedListData />
                {/* <NewOrders /> */}
              </TabPane>
            </TabContent>
          </PreviewCard>

        </Block>
      </Content>
    </React.Fragment>
  );
};

export default OrdersLists;
