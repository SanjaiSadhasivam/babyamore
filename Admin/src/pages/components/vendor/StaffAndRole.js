import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Icon from "../../../components/icon/Icon";
import classnames from "classnames";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../../components/preview/Preview";
import './Ticketss.css'
import StaffManagement from "./StaffManagement";
import RoleManagement from "./RoleManagement";

const Ticketss = ({ ...props }) => {
 
  const [activeIconTab, setActiveIconTab] = useState("1");
 
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
 
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
                  <Icon name="user" /> <span>Staff Management</span>
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
                  <Icon name="setting" /> <span>Role Management</span>
                </NavLink>
              </NavItem>
             
             
             

            </Nav>
            </PreviewCard>
            <PreviewCard>
            <TabContent activeTab={activeIconTab}>
              
              <TabPane tabId="1">
             <StaffManagement />
           
              </TabPane>
              <TabPane tabId="2">
              <RoleManagement />
              </TabPane>
                        
            
            </TabContent>
          </PreviewCard>
      
        </Block>

     

      

      </Content>
    </React.Fragment>
  );
};

export default Ticketss;
