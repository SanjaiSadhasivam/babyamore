import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";
import { ToastContainer, toast } from 'react-toastify';
import { Nav, NavItem, NavLink,Button, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import './Ticketss.css'
import Overview from "./Overview";
import BasicInfo from "./BasicInfo";
import Company from "./Company";
import Bank from "./Bank";
import OrderPoc from "./OrderPoc";
import Warehouse from "./Warehouse";
import Terms from "./Terms";
import Brand from "./BrandVendor";
import StaffAndRole from "./StaffAndRole"
import axios from "axios";
// import { API_URL } from "../../../utils/Api"
import { API_URL,API_Vendor, token,API_Customer } from "../../../Api";
import { useCookies } from "react-cookie";

// const API_Vendor = `${API_URL}/UserVendor`
const API_Notification = `${API_Customer}/notification`
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token} `,
  },
};

const Ticketss = ({ ...props }) => { 

  const [activeIconTab, setActiveIconTab] = useState("1");

  const [TokenIds, setTokenIds] = useState();
  const [userData, setUserData] = useState();
  const [cookies, setCookie] = useCookies();
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const selectTab = useCallback((count) => {
    setActiveIconTab(count);
  }, []);

  useEffect(() => {
    const Token = JSON.stringify(localStorage.getItem("accessToken"))
    if (Token) {
      setTokenIds(Token._id)
      GetProfile(Token._id)
    }
  }, []);
    const ID=cookies.vendor_id
  const GetProfile = async () => {
    const datas = await axios.get(`${API_Vendor}/${ID}`, config);
    setUserData(datas.data.list)
  }
  const [Notify, setNotify] = useState("Request for your approval");
  const handleBack = () => {
    let formData = new FormData();
    formData.append("notifymessage", Notify +" " + "from" +" "+   userData[0].company_name);
    const configs = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post(API_Notification, formData, configs).then((res) => {
      toast.success("Approval Sent Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <React.Fragment>
      <Head title="Profile" />
      <Content page="component" >
      <Button className="toggle d-none d-md-inline-flex" type="button" color="primary" 
        style={{marginBottom:'10px',}} onClick={handleBack}>
        <Icon name="arrow"></Icon>
          Request For Approval
      </Button>
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
                  <Icon name="eye" /> <span>OverView</span>
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
                  <Icon name="user" /> <span>Basic Info</span>
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
                  <Icon name="building" /> <span>Company</span>
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
                  <Icon name="wallet-saving" /> <span>Bank</span>
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
                  <Icon name="home" /> <span>Warehouse</span>
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
                  <Icon name="article" /> <span>Order POC</span>
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
                  <Icon name="setting" /> <span>Brands</span>
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
                  <Icon name="users" /> <span>Terms</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  className={classnames({ active: activeIconTab === "9" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("9");
                  }}
                >
                  <Icon name="link" /> <span>Staff &amp; Role</span>
                </NavLink>
              </NavItem>

            </Nav>
          </PreviewCard>
          <PreviewCard>
            <TabContent activeTab={activeIconTab}>

              <TabPane tabId="1">
                <Overview Tokenid={TokenIds} getTab={selectTab} />
              </TabPane>
              <TabPane tabId="2">
                <BasicInfo getTab={selectTab} userDetail={userData} />
              </TabPane>
              <TabPane tabId="3">
                <Company getTab={selectTab} />
              </TabPane>
              <TabPane tabId="4">
                <Bank getTab={selectTab} />
              </TabPane>
              <TabPane tabId="6">
                <Warehouse />
              </TabPane>
              <TabPane tabId="5">
                <OrderPoc />
              </TabPane>
              <TabPane tabId="7">
                <Brand/>
              </TabPane>
              <TabPane tabId="8">
                <Terms />
              </TabPane>
              <TabPane tabId="9">
                <StaffAndRole />
              </TabPane>
            </TabContent>
          </PreviewCard>
          {/* <CodeBlock language="jsx">
            {`const TabExample = () => {
    const [activeTab , setActivetab] = useState("1");

    const toggle = () => {setActivetab(!activeTab)};
    return (
    <Nav tabs>
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
          <Icon name="user" /> <span>Personal</span>
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
          <Icon name="lock-alt" /> <span>Security</span>
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
          <Icon name="bell" /> <span>Notifications</span>
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
          <Icon name="link" /> <span>Connect</span>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeIconTab}>
      <TabPane tabId="1">
        <p> Some text for tab 1 </p>
      </TabPane>
      <TabPane tabId="2">
        <p> Some text for tab 2 </p>
      </TabPane>
      <TabPane tabId="3">
        <p> Some text for tab 3 </p>
      </TabPane>
      <TabPane tabId="4">
        <p> Some text for tab 4 </p>
      </TabPane>
    </TabContent>
    )
  }
    `}
          </CodeBlock> */}
        </Block>

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />



      </Content>
    </React.Fragment>
  );
};

export default Ticketss;
