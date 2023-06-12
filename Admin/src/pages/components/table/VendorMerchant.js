import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, } from "reactstrap";
import { Block } from "../../../components/block/Block";
import { Button } from "../../../components/Component"
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import './Ticketss.css'
import Overview from "./Overview";
import BasicInfo from "./BasicInfo";
import Company from "./Company";
import Bank from "./Bank";
import OrderPoc from "./OrderPoc";
import Warehouse from "./Warehouse";
import Terms from "./Terms";
import StaffAndRole from "./StaffAndRole"
import ChangePassword from "./ChangePassword";

const Ticketss = ({ ...props }) => {



  const [activeIconTab, setActiveIconTab] = useState("2");



  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };

  const selectTab = useCallback((count) => {
    setActiveIconTab(count);
  }, []);


  return (
    <React.Fragment>
      <Head title="Profile" />
      <Content page="component">




        <Block size="lg">

          <PreviewCard>
            <Nav tabs >
              {/* <NavItem>
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
              </NavItem> */}

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
                  className={classnames({ active: activeIconTab === "10" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("10");
                  }}
                >
                  <Icon name="ni ni-unlock" /> <span>Change Password</span>
                </NavLink>
              </NavItem>

              {/* <NavItem>
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
              </NavItem> */}
              {/* <NavItem>
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
              </NavItem> */}
              {/* <NavItem>
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
              </NavItem> */}
              {/* <NavItem>
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
              </NavItem>  */}
              {/* <NavItem>
                <NavLink
                  tag="a"
                  href="#tab"
                  
                  className={classnames({ active: activeIconTab === "7" })}
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleIconTab("7");
                  }}
                >
                  <Icon name="setting" /> <span>Settings</span>
                </NavLink>
              </NavItem>  */}
              {/* <NavItem>
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
              </NavItem> */}
              {/* <NavItem>
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
              </NavItem> */}

            </Nav>
          </PreviewCard>
          <PreviewCard>
            <TabContent activeTab={activeIconTab}>

              {/* <TabPane tabId="1">
                <Overview getTab={selectTab} />
              </TabPane> */}
              <TabPane tabId="2">
                <BasicInfo getTab={selectTab} />
              </TabPane>
              {/* <TabPane tabId="3">
                <Company getTab={selectTab} />
              </TabPane> */}
              {/* <TabPane tabId="4">
                <Bank getTab={selectTab} />
              </TabPane> */}
              {/* <TabPane tabId="5">
                <OrderPoc />
              </TabPane> */}
              {/* <TabPane tabId="6">
                <Warehouse />
              </TabPane> */}
              {/* <TabPane tabId="7">
                <p>
                  Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor
                  proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua
                  amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa
                  ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.
                </p>
              </TabPane> */}
              {/* <TabPane tabId="8">
                <Terms />
              </TabPane> */}
              {/* <TabPane tabId="9">
                <StaffAndRole />
              </TabPane> */}
              <TabPane tabId="10" className="py-4">
                <ChangePassword />
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





      </Content>
    </React.Fragment>
  );
};

export default Ticketss;
