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

import { DisputesTableData, disputesTableColumns2s, disputesTableColumns2s1, userData } from "./TablesData";
import { orderData } from "../../pre-built/orders/OrderData";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";

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


const AttsData = () => {
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
      <Head title="Attributes" />
      <Content page="component">
        <BlockHead size="lg" wide="sm">
          
        </BlockHead>

     
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">ATTRIBUTES</BlockTitle>
             

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
                  <ul className="nk-block-tools g-3" style={{ justifyContent: "end" }}>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>ADD ATTRIBUTES VALUE </span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("details");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>ADD ATTRIBUTES </span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockHead>
          <BlockBetween></BlockBetween>
          <PreviewCard>
            <ReactDataTable
              data={DisputesTableData}
              columns={disputesTableColumns2s}
              expandableRows
              pagination
              actions
            />
          </PreviewCard>
        </Block>

        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">FORM</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">

                  <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                        ATTRIBUTE* 
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Color", label: "Color" },
                              { value: "Format", label: "Format" },
                              { value: "Gender", label: "Gender" },
                              { value: "Pattern", label: "Pattern" },
                              { value: "Size", label: "Size" },
                              { value: "Style", label: "Style" },

                              
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        ATTRIBUTE VALUE*
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name=" ATTRIBUTE Value*"
                            placeholder="Attribute Value"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        LIST ORDER 
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Viewing Order"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.customer}
                          />
                           {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                 
                 

                    <Col size="12" style={{justifyContent:'end'}}>
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>SAVE </span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>
          <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">FORM*</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                  <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                    ATTRIBUTE VALUE*
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "Color/Pattern", label: "Color/Pattern" },
                              { value: "Radio", label: "Radio" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                        ATTRIBUTE NAME
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Attribute Name"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          LIST ORDER
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            placeholder="Viewing Order"
                          />
                        </div>
                      </div>
                    </Col>
                    
                        <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                        CATEGORIES
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                            
                            ref={register({ required: "This is required" })}
                           

                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                      {errors.status && <span className="invalid">{errors.status.message}</span>}

                        </div>
                      </div>
                    </Col>
                  

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span> Save </span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        
      </Content>
    </React.Fragment>
  );
};
export default AttsData;
