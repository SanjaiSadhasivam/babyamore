import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link } from 'react-router-dom';
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
} from "../../../components/Component";

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";


import { DisputesTableDatas, disputesTableColumns, disputesTableColumns2, userData } from "./AttrsDatas";



  const AttrData = () => {
  
    const [smOption, setSmOption] = useState(false);
    const [formData, setFormData] = useState({
    })

  return (
    <React.Fragment>
      <Head title="Disputes Table" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
        </BlockHead>


        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Product List</BlockTitle>
              <div className="toggle-wrap nk-block-tools-toggle">
              {/* <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                 
                </a> */}
                  
                <div className="toggle-expand-content1" >
                  <ul className="nk-block-tools g-3" style={{justifyContent:'end'}}>
                    
                   
                   <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                       style={{width:'130px', top:'-73px'}} >
                        <Icon name="plus"></Icon><Link to='./App-Messages' style={{color:'white'}}>Add Product </Link>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                       style={{width:'100%'}}>
                     
                        <Icon name="plus"></Icon>
                        <Link to='./App-Messages' style={{color:'white'}}>
                       Add Product </Link>
                      </Button>
                    </li> 
                  </ul>
                </div>
              </div>




            </BlockHeadContent>
            
          </BlockHead>
          




          <PreviewCard>
            <ReactDataTable data={DisputesTableDatas} columns={disputesTableColumns} expandableRows pagination actions />
          </PreviewCard>
        </Block>

 
      </Content>
    </React.Fragment>
  );
};





export default AttrData;
