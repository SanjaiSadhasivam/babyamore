import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Card } from "reactstrap";
import { Badge, Form, Input, Label, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Button, FormGroup, Modal, ModalBody } from "reactstrap";

import Custom from "../../../components/partials/default/Custom.css";
import { DisputesTableDataod1, disputesTableColumnsdd1, disputesTableColumns2s1, userData } from "./TableData";
import AudienceOverview from "../../../components/partials/e-commerce/average-order/AudienceOverview";
import { messageData } from "./MessageData";

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

const Status = () => {
  const [data, setData] = useState(messageData);
  const [filteredTabData, setFilteredTabData] = useState(messageData);
  const [filterTab, setFilterTab] = useState("1");
  const [search, setOnSearch] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedId, setSelectedIt] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [tabData, setTabData] = useState();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [Review, setReview] = useState({
    reviewmsg: "",
    reviewname: "",
    reviewemail: "",
  });

  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };

  const [smOption, setSmOption] = useState(false);

  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, paid: false, status: false });
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
    setView({ add: false, details: false, paid: false, status: false });
    resetForm();
  };
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: "",
    status: "",
    customer: "",
    purchased: "",
    paid: "",
    total: "",
    list: "",
    add: "",
    check: false,
  });

  const [files1, setFiles1] = useState([]);

  const handleDropChange1 = (acceptedFiles) => {
    setFiles1(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const resetForm = () => {
    setFormData({
      ...formData,
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
  const onInputChange = (e) => {
    setFilterText(e.target.value);
  };

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      paid: type === "paid" ? true : false,
      status: type === "status" ? true : false,
    });
  };

  const [view, setView] = useState({
    add: false,
    details: false,
    paid: false,
    status: false,
  });

  return (
    <>
      <Block >
        <BlockHead>
          <BlockHeadContent>


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


            </div>
          </BlockHeadContent>
        </BlockHead>
        <BlockBetween></BlockBetween>

      </Block>

      <Card >
        <div className="card-inner d-md-inline-flex" style={{ justifyContent: "space-evenly" }}>
          <div className="pricing-action">
            <Button
              className="toggle  "
              color="primary"
              onClick={() => {
                toggle("paid");
              }}
            >
              MARK AS PAID{" "}
            </Button>
          </div>
          <div className="pricing-action">

            <Button color="secondary" onClick={() => {
              toggle("add");
            }}>UPDATE STATUS</Button>

          </div>
          <div className="pricing-action">
            <Button color="danger" onClick={() => {
              toggle("details");
            }}>CANCEL ORDER</Button>

          </div>
          <div className="pricing-action">
            <Button color="success" onClick={() => {
              toggle("status");
            }}>FUIFILL ORDER </Button>
          </div>
        </div>
      </Card>


      <Modal isOpen={view.paid} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
            <h1 className="title">Confirmation*</h1>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="g-3">
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">
                        Are you sure you want to do this?
                      </label>
                      <div className="form-control-wrap">

                      </div>
                    </div>
                  </Col>


                  <Col size="12" className="text-left">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span> Proceed </span>
                    </Button>&nbsp;
                    <Button color="info" type="submit">
                      <Icon className="plus"></Icon>
                      <span> Cancel </span>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
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
            <h5 className="title"> UPDATE </h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="g-3">


                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        ORDER STATUS*
                      </label>
                      <div className="form-control-wrap">
                        <RSelect


                          options={[
                            { value: "Waiting For Payment ", label: "Waiting For Payment" },
                            { value: "Payment Error", label: "Payment Error" },
                            { value: "Confirmed", label: "Confirmed" },
                            { value: "Awaiting Delivery", label: "Awaiting Delivery" },
                            { value: "Delivered", label: "Delivered" },
                            { value: "Refunded ", label: "Refunded" },

                          ]}
                          name="customer"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.customer}
                        />
                      </div>
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                  <Form>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" />
                      <Label check>
                        SEND A NOTIFICATION EMAIL TO CUSTOMER
                      </Label>
                    </FormGroup>
                  </Form>
                  <Col size="12">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span> UPDATE </span>
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
                      <label className="form-label" htmlFor="customer">
                        ORDER CANCELLATION FEE:
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                        />
                      </div>
                    </div>
                  </Col>




                  <Col size="12">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span> CANCEL ORDER </span>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={view.status} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
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
            <h5 className="title">FULFILL ORDER*</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="g-3">
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="status">

                      </label>
                      <div className="form-control-wrap">

                      </div>
                    </div>
                  </Col>





                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        TRACKING ID
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                          placeholder="Order Tracking ID"
                        />
                      </div>
                    </div>
                  </Col>




                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="customer">
                        SHIPPING CARRIER* *
                      </label>
                      <div className="form-control-wrap">
                        <RSelect


                          options={[
                            { value: "No Result is Found ", label: "No Result is Found" },


                          ]}
                          name="customer"
                          ref={register({ required: "This is required" })}
                          defaultValue={formData.customer}

                        />
                      </div>
                      {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                    </div>
                  </Col>
                  <Form>
                    <FormGroup
                      check
                      inline
                    >
                      <Input type="checkbox" />
                      <Label check>
                        SEND A NOTIFICATION EMAIL TO CUSTOMER
                      </Label>
                    </FormGroup>

                  </Form>


                  <Col size="12">
                    <Button color="primary" type="submit">
                      <Icon className="plus"></Icon>
                      <span> UPDATE</span>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>

    </>
  );
};
export default Status;
