import React, { useEffect, useState } from "react";

import Content from "../../../layout/content/Content";
import { useForm } from "react-hook-form";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  BackTo,
  PreviewCard,
  ReactDataTable,
  Row,
  RSelect,
  Col,
} from "../../../components/Component";

import { DisputesTableProd, disputesTableColumnsprod, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
const Prods = () => {
  const [data, setData] = useState(orderData);
  const [smOption, setSmOption] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    check: false,
  });

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

const [view, setView] = useState({
  add: false,
  details: false,
});

const toggle = (type) => {
  setView({
    add: type === "add" ? true : false,
    details: type === "details" ? true : false,
  });
};

// function to close the form modal
const onFormCancel = () => {
  setView({ add: false, details: false });
  // resetForm();
};

const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({...formData,
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };


  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Products" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
     
        </BlockHead>

      

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4"> PRODUCTS</BlockTitle>

              
              {/* <p>
                Pass in the <code>actions</code> props to add export option to the table.
              </p> */}

              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div
                  className="toggle-expand-content"
                  style={{ display: smOption ? "block" : "none", justifyContent: "end" }}
                >
                  
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableProd}
              columns={disputesTableColumnsprod}
              expandableRows
              pagination
              actions
            />
          </PreviewCard>
        </Block>

     

       
      </Content>
    </React.Fragment>
  );
};
export default Prods;
