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


import { DisputesTableDatas, disputesTableColumns, disputesTableColumns2, userData } from "./TableData";



  const Prod2Lists = () => {
  
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





export default Prod2Lists;
